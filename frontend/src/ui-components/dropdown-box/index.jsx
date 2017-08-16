import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { fromJS, is } from 'immutable';
import Icon from 'ui-components/icon';
import Popup from './popup';
import DropdownBoxOption from './option';
import './style.css';

class DropdownBox extends Component {
  static propTypes = {
    className  : PropTypes.string,
    style      : PropTypes.object,
    /**
     * дефолтное значение для dropDown
     * это поле не обязательно
     * если его нет, то значение поумолчанию берется из массива options -> selected
     */
    value      : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object,
    ]),
    placeholder: PropTypes.string,
    options    : PropTypes.arrayOf(PropTypes.shape({
      value   : PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title   : PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
        PropTypes.number
      ]).isRequired,
      selected: PropTypes.bool
    })).isRequired,

    /** переход по TAB между полями формы */
    tabIndex : PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    isWarning: PropTypes.bool,
    isFocused: PropTypes.bool,

    /** рендер кастомных элементов стиска  */
    optionRenderer: PropTypes.func,

    /** рендер кастомного value  */
    valueRenderer: PropTypes.func,
    isError      : PropTypes.bool,
    isDisabled   : PropTypes.bool,
    maxHeight    : PropTypes.number,

    /** data-loc локаторы для авто-тестирования */
    testLocator: PropTypes.string,

    /** получаем весь объект, а не отдельное свойство value */
    isGetFullValue: PropTypes.bool,
    onChange      : PropTypes.func.isRequired,
    onFocus       : PropTypes.func.isRequired,
    onBlur        : PropTypes.func.isRequired
  };

  static defaultProps = {
    onChange      : _ => _,
    onFocus       : _ => _,
    onBlur        : _ => _
  };

  constructor(props) {
    super(props);
    const options = fromJS(this.props.options);

    this.state = {
      options,
      active  : options.findKey(option => option.get('selected')) || 0,
      isOpened: false,
    };

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const nextOptions = fromJS(nextProps.options);
    const prevOptions = fromJS(this.state.options);

    if (!is(nextOptions, prevOptions)) {
      this.setState({
        options: nextOptions,
        active : nextOptions.findKey(option => option.get('selected')) || 0,
      });
    }
  }

  handlePrev() {
    const { options, active } = this.state;
    this.setState({
      active: active === 0 ? options.size - 1 : active - 1
    });
  }

  handleNext() {
    const { options, active } = this.state;
    this.setState({
      active: active === options.size - 1 ? 0 : active + 1
    });
  }

  /**
   *
   * @param evt
   */
  handleEnter(evt) {
    const { isGetFullValue, onChange } = this.props;
    const { active } = this.state;
    const options = this.state.options.map((item, key) =>
      item.set('selected', key === active)
    );
    this.setState({
      options,
      isOpened: false
    });
    if (isGetFullValue) {
      onChange(evt, options.find(option => option.get('selected')));
    } else {
      onChange(evt, options.find(option => option.get('selected')).get('value'));
    }
  }

  handleOpen() {
    this.setState({ isOpened: true });
    if (!this.isInputFocused()) {
      this.input && this.input.focus();
    }
  }

  _onFocus = () => {
    this.handleOpen();
    this.props.onFocus();
  };

  _onBlur = () => {
    this.props.onBlur();
  };

  handleClose() {
    this.setState({ isOpened: false });
    this.input && this.input.blur();
  }

  handleOnClick(evt, value) {
    const options = this.state.options.map(item =>
      item.set('selected', item.get('value') === value)
    );
    this.setState({
      options,
      isOpened: false
    });
    this.props.onChange(evt, value);
  }

  handleOnMouseEnter(index) {
    this.setState({ active: index });
  }

  handleOnMouseLeave() {
    this.setState({
      active: this.state.options.findKey(option => option.selected)
    });
  }

  /* eslint-disable no-useless-return */
  /**
   * метод обработки события с клавиатуры
   *  пока обрабатываем tab и escape
   * если контрол isDisabled, то не обрабатываем
   * @param event
   */
  handleKeyDown = (event) => {
    if (this.props.isDisabled) return;

    switch (event.keyCode) {
      case 9: // tab
      case 27: // escape
        if (this.state.isOpened) {
          this.handleClose();
          event.stopPropagation();
        }
        break;
      default:
        return;
    }
  };

  isInputFocused = () => {
    const el = this.input;
    return (el && el.ownerDocument && (el === el.ownerDocument.activeElement)) || false;
  };

  /**
   * input нужен для перехода на поле по TAB
   *  и перехвата других событий
   */
  renderInput = () => (
    <input
      type="text"
      ref={el => (this.input = el)}
      className="b-dropdown-box__input"
      tabIndex={this.props.tabIndex}
      onKeyDown={this.handleKeyDown}
      onFocus={this._onFocus}
      onBlur={this._onBlur}
    />
  );

  renderValue = () => {
    const { placeholder, value, valueRenderer } = this.props;
    const { isOpened, options } = this.state;
    let selectedOption = !value ? options.find(option => option.get('selected')) : value;
    selectedOption = fromJS(selectedOption);

    return (
      <div
        ref={el => (this.innerElement = el)}
        role="combobox"
        aria-expanded={isOpened}
        className="b-dropdown-box__inner"
        onClick={this.handleOpen}
      >
        <div className="b-dropdown-box__value">
          {!selectedOption && placeholder}
          {(!valueRenderer && selectedOption) && selectedOption.get('title')}
          {valueRenderer && selectedOption
            ? valueRenderer(selectedOption.toJS()) : null }
        </div>
        <div className="b-dropdown-box__icon">
          <Icon type="dropdown" size="16" />
        </div>
      </div>
    );
  };

  renderPopup = () => {
    const { optionRenderer, isGetFullValue, maxHeight, testLocator } = this.props;
    const { options, active } = this.state;
    return (
      <Popup
        testLocator={testLocator ? `${testLocator}Popup` : null}
        openerElement={this.innerElement}
        onPrev={this.handlePrev}
        onNext={this.handleNext}
        onEnter={this.handleEnter}
        onClose={this.handleClose}
        maxHeight={maxHeight}
      >
        <div className="b-dropdown-box__options">
          {options.map((option, key) => (
            <DropdownBoxOption
              key={key}
              index={key}
              value={!isGetFullValue ? option.get('value') : option}
              selected={option.get('selected')}
              active={key === active}
              onClick={this.handleOnClick}
              onMouseEnter={this.handleOnMouseEnter}
              onMouseLeave={this.handleOnMouseLeave}
            >
              {!optionRenderer
                ? option.get('title', ' ')
                : optionRenderer(option.toJS(), key)
              }
            </DropdownBoxOption>
          ))}
        </div>
      </Popup>
    );
  };


  render() {
    const {
      className,
      style,
      isWarning,
      isError,
      isDisabled,
      isFocused,
      testLocator
    } = this.props;
    const { isOpened } = this.state;
    const elementClassName = classNames('b-dropdown-box', {
      [className] : !!className,
      's-opened'  : isOpened,
      's-focused'  : isFocused,
      's-warning' : isWarning,
      's-error'   : isError,
      's-disabled': isDisabled
    });


    return (
      <div className={elementClassName} style={style} data-loc={testLocator}>
        {!isDisabled && this.renderInput()}
        {this.renderValue()}
        {!isDisabled && isOpened && this.renderPopup()}
      </div>
    );
  }
}

export default DropdownBox;
