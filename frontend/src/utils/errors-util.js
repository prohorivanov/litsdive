import { flowRight, isObject }  from 'lodash';
import { getErrorByKey }  from 'utils/utils';
/**
 *
 * @param error
 */
export const getErrorData = error => (
  error && error.response && error.response.data && error.response.data.error
    ? error.response.data.error
    : ''
);

export const getErrors = errorType => (
  errorType && getErrorByKey(errorType)
);

export const splitErrorText = error => (
  error && error.split('.')[0]
);


/**
 * подготавливаем конфиг и показываем в нотификации
 * ошибка может придти с сервера или проброшена -> throw new Error('sign.plugin_not_installed');
 *
 * @param error
 * @param title
 * @returns {{type: string, title: (*|string), message: *}}
 */
export const prepareConfForNotification = (error, title = 'Ошибка.') => {
  let errorData = error;

  if (!getErrorData(error) && (error instanceof Error)) {
    errorData = {
      response: {
        data: { error: error.message }
      }
    };
  }

  // получаем весь объект по типу ошибки
  const typeError = flowRight(
    getErrors,
    splitErrorText,
    getErrorData
  )(errorData);

  // получаем строку ошибки
  const errorNotify = flowRight(
    getErrors,
    getErrorData
  )(errorData);

  return {
    type: 'error',
    title: (typeError && isObject(typeError) && typeError.error) || title,
    message: errorNotify
  };
};
