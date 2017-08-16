import moment   from 'moment';

/**
 * разворачиваем дату и форматируем для валидации в moment
 * дата должна придти в вормате 12.12.2017
 * @param value
 * @returns {{formatValue, date: (*|moment.Moment)}}
 */
export const formatDate = (value) => {
  const formatValue = value.split('.').reverse().join('-');
  const v = formatValue.replace(/\D+/g, '').trim();
  return {
    formatValue: v,
    date       : moment(formatValue)
  };
};

/**
 * Валидна ли дата по мнению moment и если длинна равна 8 ИЛИ если поле пустое
 * @param {string} value
 * @return boolean
 */
export const isValidDate = (value) => {
  const { formatValue, date } = formatDate(value);
  return ((date.isValid() && formatValue.length === 8) || (!formatValue || !formatValue.length));
};
