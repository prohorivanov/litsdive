import { put } from 'redux-saga/effects';
import {
  ACTIONS
} from '../constants';

/**
 *
 * @param payload
 */
export function* deleteCertSaga({ payload }) {
  const { id } = payload;
  try {
    yield put({
      type: ACTIONS.CRYPTO_OPERATION_DELETE_SUCCESS,
      payload: id
    });
  } catch (error) {
    yield put({ type: ACTIONS.CRYPTO_OPERATION_DELETE_FAIL, error: error.message });
  }
}


export function* repeatCertSaga({ payload }) {
  const { id } = payload;
  try {
    yield put({
      type: ACTIONS.CRYPTO_OPERATION_REPEAT_SUCCESS,
      payload: id
    });
  } catch (error) {
    yield put({ type: ACTIONS.CRYPTO_OPERATION_REPEAT_FAIL, error: error.message });
  }
}

export function* sendToBankCertSaga({ payload }) {
  const { id } = payload;
  try {
    yield put({
      type: ACTIONS.CRYPTO_OPERATION_SEND_SUCCESS,
      payload: id
    });
  } catch (error) {
    yield put({ type: ACTIONS.CRYPTO_OPERATION_SEND_FAIL, error: error.message });
  }
}

export function* signCertSaga({ payload }) {
  const { id } = payload;
  try {
    yield put({
      type: ACTIONS.CRYPTO_OPERATION_SIGN_SUCCESS,
      payload: id
    });
  } catch (error) {
    yield put({ type: ACTIONS.CRYPTO_OPERATION_SIGN_FAIL, error: error.message });
  }
}

