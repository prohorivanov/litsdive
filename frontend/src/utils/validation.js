/**
 * @todo
 * Валидаторы формы
 * дорабатываем по мере необходимости
 */

import isEmpty            from 'lodash/isEmpty';
import { filterPlural }   from './utils';

/**
 * Check for an empty mix value
 * @param {Object|Array|number|string|null} value
 * @returns {boolean}
 */
export const isEmptyField = value => (
  Number.isInteger(value) ? false : isEmpty(value)
);

/**
 * @todo уточнить шаблон валидации email
 * @param {string} value
 * @returns {string|null}
 */
export const email = value => (
  !isEmptyField(value) && !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]+$/i.test(value) ?
    'Невалидный email адрес' : null
);

/**
 * Check for required fields
 * @param {Object|Array|number|string|null}
 * @returns {string|null}
 */
export const required = value => (
  !value || isEmptyField(value) ? 'Обязательно для заполенения' : null
);

/**
 * Check for the minimum value
 * @param {string} value
 * @param {number} min
 * @returns {string|null}
 */
export const minLength = (value, min) => (
  !isEmptyField(value) && value.length < min ?
    `Мин. ${min} ${filterPlural(['символ', 'символа', 'символов'], min)}` : null
);

/**
 * Check for the maximum value
 * @param {string} value
 * @param {number} max
 * @returns {string|null}
 */
export const maxLength = (value, max) => (
  !isEmptyField(value) && value.length > max ?
    `Макс. ${max} ${filterPlural(['символ', 'символа', 'символов'], max)}` : null
);

/**
 * Check numerical value
 * @param {number} value
 * @returns {string|null}
 */
export const integer = value => (
  !Number.isInteger(Number(value)) ? 'Только число' : null
);

/**
 * Сheck the entry to one of the values
 * @param {Array} enumeration
 * @param {number|string} value
 * @returns {string|null}
 */
export const oneOf = (enumeration, value) => (
  !enumeration.includes(value)
    ? `Должен быть один из: ${enumeration.join(', ')}` : null
);

/**
 *
 * @param {number|string} value1
 * @param {number|string} value2
 * @returns {string|null}
 */
export const match = (value1, value2) => (
  (value1 && value2) && value1 !== value2 ? 'Значения не совпадают' : null
);

/**
 * Проверка больше ли число другого значения
 * @param {number} field
 * @param {number} value
 * @returns {string|null}
 */
export const isBiggerThen = (field, value) => (
  field && field > value ? `Значение ${field} больше ${value}` : null
);
