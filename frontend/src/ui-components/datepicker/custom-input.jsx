import React, {
  Component,
  PropTypes
} from 'react';
import { formatDate, isValidDate }  from './util';
import {
  StyledCustomInput,
  StyledMaskedInput
}  from './styles.js';

export default class CustomInput extends Component {

  static propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    refProp: PropTypes.func,
    changeInputValue: PropTypes.func.isRequired,
    calendar: PropTypes.object,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    tabIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ])
  }

  constructor(props) {
    super(props);
    this.state.valueInput = this.props.value;
  }

  state = {
    valueInput: '',
    error: false
  }

  componentDidMount() {
    const { value, changeInputValue } = this.props;
    changeInputValue && changeInputValue(value);
  }

  /**
   * убираем ошибку при выборе даты из колендаря
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.value) {
      const { formatValue } = formatDate(nextProps.value);
      if (formatValue.length === 8 && isValidDate(nextProps.value)) {
        this.setState({ error: false });
      }

      this.setState({
        valueInput: nextProps.value
      });
    }
  }

  _onChange = (evt) => {
    evt.persist();
    const { value } = evt.target;
    const { onChange, changeInputValue } = this.props;

    this.setState(() => ({
      valueInput: value
    }), () => {
      changeInputValue(value);
      onChange && onChange(evt);
    });
  }

  _onFocus = (evt) => {
    const { onFocus } = this.props;
    onFocus && onFocus(evt);
  }


  /**
   * валидируем дату только когда закончили ввод полностью
   * по Backspace - убираем ошибку
   * @param evt
   * @private
   */
  _onKeyDown = (evt) => {
    const { value } = evt.target;
    const { formatValue } = formatDate(value);
    if (formatValue.length === 8 && evt.key !== 'Backspace') {
      this.setState({ error: !isValidDate(value) });
    }

    if (evt.key === 'Backspace') {
      this.setState({ error: false });
    }

    if (evt.key === 'Enter' || evt.key === 'Tab') {
      this.validateValue(evt);
    }
  }


  validateValue = (evt) => {
    const { calendar, onBlur } = this.props;
    const { valueInput } = this.state;
    const { formatValue } = formatDate(valueInput);
    const isValid = isValidDate(valueInput);

    // если дата не валидна и вбито хоть какое-то значение
    if ((formatValue.length > 0 && formatValue.length < 8) || !isValid) {
      this.setState({ error: true });

      // если дата валидна или пустая
    } else if (isValid) {
      this.setState(() => ({
        error: false
      }), () => {
        calendar && calendar.setOpen && calendar.setOpen(false);
        this.input && this.input.blur();
        onBlur && onBlur(evt);
      });
    }
  }

  /**
   * если дата не валидна, не даем закрыть календарь
   * @param evt
   * @private
   */
  _onBlur = (evt) => {
    evt.stopPropagation();
    const { onBlur } = this.props;
    const { valueInput } = this.state;
    const isValid = isValidDate(valueInput);
    if (isValid) {
      onBlur && onBlur(evt);
    }
  }

  render() {
    const { valueInput, error } = this.state;
    const { disabled, name, tabIndex, refProp } = this.props;

    return (
      <StyledCustomInput>
        <StyledMaskedInput
          className={error ? 'b-forms__error' : ''}
          innerRef={(el) => {
            refProp(el);
            this.input = el;
          }}
          mask="11.11.1111"
          size="10"
          value={valueInput}
          placeholderChar=" "
          onChange={this._onChange}
          onFocus={this._onFocus}
          onKeyDown={this._onKeyDown}
          onBlur={this._onBlur}
          disabled={disabled}
          name={name}
          tabIndex={tabIndex}
        />
      </StyledCustomInput>
    );
  }
}
