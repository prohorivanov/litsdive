import React, {
  Component,
  PropTypes
} from 'react';
import classNames from 'classnames';
import moment from 'moment-timezone';
import CustomInput from './custom-input';
import { isValidDate } from './util';
import {
  SiteDatePicker,
  StyledDatePicker,
  IconCalendar
}  from './styles.js';

import './styles-override.css';

export default class DatesFieldCalendar extends Component {
  static propTypes = {
    selected: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    startDate: PropTypes.string,
    maxDate: PropTypes.object,
    className: PropTypes.string,
    dateFormat: PropTypes.string,
    isRequired: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    name: PropTypes.string,
    error: PropTypes.bool,
    warning: PropTypes.bool
  }

  state = {
    valueInput: ''
  };

  setCalendarInputFocus = () => {
    this.customInput && this.customInput.input.focus();
  }

  toggleOpen = (open) => {
    if (this.CALENDAR) {
      this.CALENDAR.setOpen(open);
    }
  }

  refProp = (el) => {
    this.customInput = el;
  }

  /**
   * если дата не валидна, не закрываем календарь
   * @private
   */
  _clickOutside = (evt) => {
    evt.stopPropagation();
    const { valueInput } = this.state;
    const isValid = isValidDate(valueInput) || null;
    if (isValid) {
      this.CALENDAR.cancelFocusInput();
      this.CALENDAR.setOpen(false);
    } else {
      this.CALENDAR.setOpen(true);
    }
  };

  _changeInputValue = (value) => {
    this.setState({ valueInput: value });
  };

  _onBlur = (evt) => {
    const { onBlur } = this.props;
    try {
      evt.persist();
      const valueDate = evt.target.value ? moment(evt.target.value, 'DD.MM.YYYY') : null;
      if (valueDate) {
        const valueDateFormat = valueDate.isValid()
          ? moment(valueDate)
          : moment(valueDate, 'DD.MM.YYYY');
        onBlur(valueDateFormat);
      } else {
        onBlur(null);
      }
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }

  /**
   * Рендер компонента
   * @returns {XML}
   */
  render() {
    const {
      tabIndex,
      selected,
      startDate,
      dateFormat,
      disabled,
      name,
      error,
      warning,
      onFocus,
      ...rest
    } = this.props;

    const classSelectors = classNames('b-site-datepicker', {
      'b-forms__error-wrapper': error,
      'b-forms__warning-wrapper': warning && !error
    });

    // tetherConstraints={[]} исследовать это свойство
    // влияет на положение календаря
    return (
      <SiteDatePicker className={classSelectors}>
        <StyledDatePicker
          isClearable
          showYearDropdown
          showMonthDropdown
          scrollableYearDropdown
          disabledKeyboardNavigation
          autoComplete="off"
          customInput={
            <CustomInput
              refProp={this.refProp}
              tabIndex={tabIndex}
              changeInputValue={this._changeInputValue}
              disabled={disabled}
              calendar={this.CALENDAR}
            />
          }
          selected={selected}
          startDate={startDate}
          dateFormat={dateFormat || 'DD.MM.YYYY'}
          disabled={disabled}
          {...rest}
          onFocus={onFocus}
          onBlur={this._onBlur}
          onClickOutside={this._clickOutside}
          todayButton="Сегодня"
          innerRef={(el) => {
            this.CALENDAR = el;
          }}
          name={name}
          tabIndex={tabIndex}
        />
        <IconCalendar size="16" type="calendar" />
      </SiteDatePicker>
    );
  }
}
