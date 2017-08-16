import { toString, at } from 'lodash';
import { ERRORS } from './errors';

/**
 * filterPlural(['стол', 'стола', 'столов'], 11)
 * curry
 *  this.curry = filterPlural.bind(null, ['стол', 'стола', 'столов'])
 *  this.curry(1)
 *  this.curry(5)
 *
 * @param {Array<string>} titles
 * @param {number} number
 * @returns {string}
 */
export const filterPlural = (titles, number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
};


/**
 *
 * @param {string} text
 * @param {number} size
 * @returns {string}
 */
export const textOverflow = (text, size) => {
  if (text && text.length > size) {
    return `${text.substr(0, size)}...`;
  }
  return text;
};

/**
 * Возвращаем название css класса в зависимости от статуса
 * @param {string} status
 * @returns {string}
 */
export const getColorDependingOnTheStatus = (status) => {
  switch (status) {
    case 'Принят':
    case 'Исполнен':
      return 'green';
    case 'Ошибка контроля':
    case 'Ошибка реквизитов':
    case 'ЭП/АСП неверна':
    case 'Отвергнут Банком':
    case 'Отказан АБС':
    case 'Отозван':
      return 'red';
    default:
      return '';
  }
};

/**
 *
 * @param {string} value '40703810300000000038'
 * @param {string} delimiter
 * @returns {string} '40703.810.3.00000000038'
 */
export function accountFormatter(value, delimiter = '.') {
  const d = delimiter;
  let formatValue = '';

  if (!value) {
    return formatValue;
  }

  const pValue = unformat(value);
  const size = pValue.length;
  formatValue = pValue;

  if (!size) {
    return '';
  }

  if (size > 5) {
    formatValue = `${pValue.substring(0, 5)}${d}${pValue.substring(5)}`;
  }
  if (size > 8) {
    formatValue = `${pValue.substring(0, 5)}${d}${pValue.substring(5, 8)}${d}${pValue.substring(8)}`;
  }
  if (size > 9 && size < 20) {
    formatValue = `${pValue.substring(0, 5)}${d}${pValue.substring(5, 8)}${d}${pValue.substring(8, 9)}${d}${pValue.substring(9)}`;
  }
  if (size >= 20) {
    formatValue = `${pValue.substring(0, 5)}${d}${pValue.substring(5, 8)}${d}${pValue.substring(8, 9)}${d}${pValue.substring(9, 20)}`;
  }
  return formatValue;
}


/**
 *
 * @param {string} value
 * @returns {string}
 */
export function unformat(value) {
  return toString(value).replace(/[^\d]/g, ''); // Remove all but digits
}


/**
 * Проверка на наличие slash в конце строки
 * @param {string} str 
 */
export function isSlashTerminatedString(str) {
  return (typeof str === 'string' && str.charAt(str.length - 1) === '/');
}


/**
 *
 * @param errorKey
 * @returns {*}
 */
export const getErrorByKey = (errorKey) => {
  const errorStr = at(ERRORS, errorKey);
  return errorStr[0] || errorKey;
};
