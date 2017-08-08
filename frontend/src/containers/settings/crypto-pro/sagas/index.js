import { takeLatest } from 'redux-saga/effects';
import { ACTIONS } from '../constants';

import { getUlkValuesSaga } from './get-ulk-values-saga';
import { createNewCertSaga } from './create-cert-saga';
import { formCertInit } from './init-form-cert-saga';
import { changeUlkSaga } from './change-ulk-saga';
import { resetFormSaga } from './reset-form-saga';
import { getCertListSaga } from './get-cert-list-saga';
import { sendToBankNewCertSaga } from './send-to-bank-new-cert-saga';
import {
  deleteCertSaga,
  repeatCertSaga,
  sendToBankCertSaga,
  signCertSaga
} from './operation-cert-saga';

export default function* cryptoProContainerSagas() {
  yield takeLatest(ACTIONS.CRYPTO_CREATE_NEW_CERT_REQUEST, createNewCertSaga);

  yield takeLatest(ACTIONS.CRYPTO_PRO_GET_ULK_REQUEST, getUlkValuesSaga);
  yield takeLatest(ACTIONS.CRYPTO_PRO_GET_ULK_SUCCESS, formCertInit);
  yield takeLatest(ACTIONS.CRYPTO_PRO_CHANGE_ULK, changeUlkSaga);
  yield takeLatest(ACTIONS.CRYPTO_PRO_RESET_FORM, resetFormSaga);
  yield takeLatest(ACTIONS.CRYPTO_PRO_GET_CERT_LIST_REQUEST, getCertListSaga);
  yield takeLatest(ACTIONS.CRYPTO_SEND_TO_BANK_NEW_CERT_REQUEST, sendToBankNewCertSaga);

  // operation
  yield takeLatest(ACTIONS.CRYPTO_OPERATION_DELETE_REQUEST, deleteCertSaga);
  yield takeLatest(ACTIONS.CRYPTO_OPERATION_REPEAT_REQUEST, repeatCertSaga);
  yield takeLatest(ACTIONS.CRYPTO_OPERATION_SEND_REQUEST, sendToBankCertSaga);
  yield takeLatest(ACTIONS.CRYPTO_OPERATION_SIGN_REQUEST, signCertSaga);
}
