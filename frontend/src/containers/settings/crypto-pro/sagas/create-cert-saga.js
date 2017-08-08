import { put, select, all, call } from 'redux-saga/effects';
import { required }  from 'utils/validation';
import {
  startSubmit,
  stopSubmit,
  getFormValues
} from 'redux-form/immutable';
import {
  ACTIONS,
  FORM_NAME_NEW_CERT,
  FIELD_CITY,
  FIELD_EMAIL
} from '../constants';
import { createPKCS10RequestSaga } from './create-pkcs10-request';

/**
 * Валидация обязательных полей перед созданием сертификата
 * @param email
 * @param city
 * @returns {Promise}
 */
export function validateEmailAndCity(email, city) {
  const errors = {};
  return new Promise((resolve, reject) => {
    errors[FIELD_CITY] = required(city);
    errors[FIELD_EMAIL] = required(email) || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    if (!errors[FIELD_CITY] && !errors[FIELD_EMAIL]) {
      resolve();
    } else {
      reject({
        message: 'Заполните обязательные поля',
        errors
      });
    }
  });
}

/**
 * @todo в разработке
 * @param action
 */
export function* createNewCertSaga() {
  const formValues = yield select(getFormValues(FORM_NAME_NEW_CERT));
  const formValuesRaw = formValues && formValues.toJS ? formValues.toJS() : {};

  const dataNewCert = {
    ...formValuesRaw,
    UlkName: formValuesRaw.ULK.ulkName,
    SignerName: formValuesRaw.Signer.cpName,
    orgINN: formValuesRaw.ULK.orgINN,
  };

  yield all([
    put(stopSubmit(FORM_NAME_NEW_CERT, {})),
    put(startSubmit(FORM_NAME_NEW_CERT))
  ]);
  try {
    yield validateEmailAndCity(formValuesRaw[FIELD_EMAIL], formValuesRaw[FIELD_CITY]);

    // вызываем cryptoPro для создании подписи
    const createPKCS10Result = yield call(createPKCS10RequestSaga, { payload: dataNewCert });
    console.log(createPKCS10Result); // eslint-disable-line no-console

    yield all([
      put(stopSubmit(FORM_NAME_NEW_CERT, {})),
      put({
        type: ACTIONS.CRYPTO_CREATE_NEW_CERT_SUCCESS,
        payload: {
          dataNewCert,
          createPKCS10Result
        }
      }),
      put({
        type: ACTIONS.CRYPTO_SEND_TO_BANK_NEW_CERT_REQUEST,
        payload: {
          dataNewCert,
          createPKCS10Result
        }
      })
    ]);
  } catch (error) {
    yield all([
      put(
        stopSubmit(
          FORM_NAME_NEW_CERT,
          {
            [FIELD_CITY]: error.errors && error.errors[FIELD_CITY],
            [FIELD_EMAIL]: error.errors && error.errors[FIELD_EMAIL],
            _error: error.message
          }
        )
      ),
      put({ type: ACTIONS.CRYPTO_CREATE_NEW_CERT_FAIL, payload: error })
    ]);
  }
}
