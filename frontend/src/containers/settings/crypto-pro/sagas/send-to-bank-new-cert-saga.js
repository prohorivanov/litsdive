import { put, /* call */ } from 'redux-saga/effects';
import { ACTIONS } from '../constants';

/**
 * отправить в банк только что созданный сертификат
 * @param payload
 */
export function* sendToBankNewCertSaga({ payload }) {
  const { dataNewCert, createPKCS10Result } = payload;

  try {
    /*
     const result = yield call(API.signature.getCertList, {
      createdNewCertData,
      createPKCS10Result
     });
    */
    yield put({
      type: ACTIONS.CRYPTO_SEND_TO_BANK_NEW_CERT_SUCCESS,
      payload: {
        dataNewCert,
        createPKCS10Result
      }
    });
  } catch (error) {
    yield put({ type: ACTIONS.CRYPTO_SEND_TO_BANK_NEW_CERT_FAIL });
  }
}
