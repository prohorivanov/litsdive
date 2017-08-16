import React, {
  Component,
  PropTypes
} from 'react';
import classNames         from 'classnames';
import moment             from 'moment';
import isUndefined     from 'lodash/isUndefined';
import Filters            from 'utils/filters';
import DatesFieldCalendar from './date-calendar';
import './styles.css';

class DatesFields extends Component {

  static propTypes = {
    title           : PropTypes.string,
    available_from  : PropTypes.object.isRequired,
    complete_until  : PropTypes.object.isRequired,
    maxRange        : PropTypes.object,
    calendarFirst   : PropTypes.object,
    calendarSecond  : PropTypes.object,
    clearField      : PropTypes.bool,
    onChangeDates   : PropTypes.func,
    titleStart      : PropTypes.string,
    titleFinish     : PropTypes.string,
    classNameContent: PropTypes.string,
    dateFormat      : PropTypes.string,
    daysCountShow   : PropTypes.bool,
    className       : PropTypes.string,
    betweenDates    : PropTypes.number,
  }

  static defaultProps = {
    title     : '',
    clearField: true
  }

  state = {
    isShownDaysLabel: false,
    available_from  : null,
    complete_until  : null,
    maxDateLast     : null,
    daysCount       : 0,
    active          : false
  }

  /**
   * Записываем данные в стейт, которые пришли из props
   */
  componentWillMount() {
    this.setDatesToState(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const availableFrom = this.state.available_from !== nextState.available_from;
    const completeUntil = this.state.complete_until !== nextState.complete_until;
    const maxDateLast = this.state.maxDateLast !== nextState.maxDateLast;
    const active = this.state.active !== nextState.active;
    return availableFrom || completeUntil || active || maxDateLast;
  }

  /**
   * Получение количества дней между интервалом
   * @param momentStartDate
   * @param momentEndDate
   * @returns {*}
   * @private
   */
  getDaysLabel(momentStartDate, momentEndDate) {
    if (!momentStartDate || !momentEndDate) {
      return null;
    }

    let days = momentEndDate.diff(momentStartDate, 'days');
    days = days || 0;

    return `${days + 1} ${Filters.filterPlural(days + 1, ['день', 'дня', 'дней'])}`;
  }

  /**
   * Сеттим даты в локальный стейт компонента
   * @param props
   * @private
   */
  setDatesToState(props) {
    this.onChangeDates({
      start: props.available_from,
      end  : props.complete_until
    });
  }

  /**
   * Приводит интервал дат в должный вид
   * выравниваем даты между двумя календарями
   *
   * @param start
   * @param end
   * @returns {{available_from: null, complete_until: null}}
   * @private
   */
  normalizeIntervalDates = ({ start, end }) => {
    let { betweenDates, clearField } = this.props;
    betweenDates = betweenDates || 0;

    let newStartDate = isUndefined(start) ? this.state.available_from : null;
    if (start) {
      newStartDate = start;
    }

    let newEndDate = isUndefined(end) ? this.state.complete_until : null;

    if (end) {
      newEndDate = end;
    }

    /**
     * @todo поля не могут быть пустыми
     * если есть свойство clearField={true}, то можно очищать
     */
    if (!clearField) {
      if (newStartDate && !newEndDate) {
        newEndDate = this.props.complete_until;
      }

      if (!newStartDate && newEndDate) {
        newStartDate = this.props.available_from;
      }
    }

    /**
     * @todo если выбрали дату {start} и она больше или равна {newEndDate}
     * добавляем к {newEndDate} - betweenDates
     */
    if (newStartDate && newEndDate) {
      if (start && newStartDate.isSameOrAfter(newEndDate)) {
        const temp = moment(newStartDate);
        newEndDate = temp.add(betweenDates, 'day');
      }

      /**
       * @todo если выбрали дату {end} и она меньше или равна {newStartDate}
       * отнимаем от {newStartDate} - betweenDates
       */
      if (end && newEndDate.isSameOrBefore(newStartDate)) {
        const temp = moment(newEndDate);
        newStartDate = temp.subtract(betweenDates, 'day');
      }
    }

    return {
      available_from: newStartDate,
      complete_until: newEndDate
    };
  }


  /**
   * Событие, которое срабатывает при изменение дат
   * @param start
   * @param end
   * @private
   */
  _onChangeDates({ start, end }) {
    const { onChangeDates, maxRange } = this.props;
    const dates = this.normalizeIntervalDates({ start, end });

    const dateAvailableFrom = dates.available_from ? dates.available_from : null;
    const dateCompleteUntil = dates.complete_until ? dates.complete_until : null;

    const datesData = {
      available_from: dateAvailableFrom,
      complete_until: dateCompleteUntil,
      daysCount     : this.getDaysLabel(dateAvailableFrom, dateCompleteUntil)
    };

    /**
     * параметр maxRange говорит, какое максимальное количество
     * дней может быть между датами
     */
    if (maxRange) {
      const fromDate = moment(dateAvailableFrom);
      datesData.maxDateLast = fromDate.add(maxRange);
    }

    this.setState(datesData);

    onChangeDates && onChangeDates(datesData);

    // открываем закрываем след календарь после выбора даты в текущем
    if (start) {
      if (this.refs.FIELD_FINISH) {
        this.refs.FIELD_FINISH.toggleOpen(true);
      }
      if (this.refs.FIELD_START) {
        this.refs.FIELD_START.toggleOpen(false);
      }
    }
  }

  /**
   * Рендер компонента
   * @returns {XML}
   */
  render() {
    const { title, dateFormat, daysCountShow, className } = this.props;
    const { titleStart, titleFinish } = this.props;
    const { calendarFirst, calendarSecond, classNameContent }     = this.props;
    const { daysCount, maxDateLast }    = this.state;

    const classSelectors = classNames(
      'b-forms',
      'b-forms-dates',
      'b-site-datepicker',
      'b-site-datepicker__content', {
        [classNameContent]: !!classNameContent
      });

    const classError = classNames({
      'b-forms__error-round': true
    });

    const classError2 = classNames({
      'b-forms__error-round': true
    });

    return (
      <div className={classSelectors}>
        {title &&
        <div className="b-site-datepicker__title">
          {title}
        </div>
        }
        <div className="b-site-datepicker__fieldset">
          <label className="b-site-datepicker__form-label">{titleStart || 'Старт'}</label>
          <DatesFieldCalendar
            {...this.props.calendarFirst}
            className={className}
            selected={this.state.available_from}
            startDate={this.state.available_from}
            endDate={this.state.complete_until}
            onChange={(start) => {
              this._onChangeDates({ start });
            }}
            minDate={calendarFirst.minDate}
            maxDate={calendarFirst.maxDate}
            ref="FIELD_START"
            dateFormat={dateFormat || 'DD.MM.YYYY'}
          />
          <span className={classError} />
        </div>
        <div className="b-site-datepicker__fieldset">
          <label className="b-site-datepicker__form-label">{titleFinish || 'Финиш'}</label>
          <DatesFieldCalendar
            {...this.props.calendarSecond}
            className={className}
            selected={this.state.complete_until}
            startDate={this.state.available_from}
            endDate={this.state.complete_until}
            onChange={(end) => {
              this._onChangeDates({ end });
            }}
            minDate={calendarSecond.minDate}
            maxDate={maxDateLast || calendarSecond.maxDate}
            ref="FIELD_FINISH"
            dateFormat={dateFormat || 'DD.MM.YYYY'}
          />
          {daysCountShow &&
          <div className="b-site-datepicker__days-count-block">
            <div className="b-site-datepicker__days-count">{daysCount}</div>
          </div>
          }
          <span className={classError2} />
        </div>
      </div>
    );
  }
}

export default DatesFields;
