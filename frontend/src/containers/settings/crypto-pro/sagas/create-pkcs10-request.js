import { put } from 'redux-saga/effects';
import CryptoProService  from 'services/cryptopro/cryptopro';
import { isString } from 'lodash';
import { ACTIONS } from '../constants';

/**
 * проверка сертификатов на mac os
 * /opt/cprocsp/bin/
 *  ./certmgr -list
 *
 * @param payload
 */
export function* createPKCS10RequestSaga({ payload }) {
  try {
    const result = yield CryptoProService.createPKCS10Request(payload);
    yield put({
      type: ACTIONS.CRYPTO_CREATE_PKCS10_SUCCESS,
      payload: result
    });
    return result;
  } catch (error) {
    let errorMessage = error;
    if (error && isString(error)) {
      errorMessage = error;
    } else if (error && error.message) {
      errorMessage = error.message;
    }
    yield put({ type: ACTIONS.CRYPTO_CREATE_PKCS10_FAIL, error: error.message });
    throw new Error(`
      Ошибка в работе crypto-pro плагина: 
      ${errorMessage}
    `);
  }
}

