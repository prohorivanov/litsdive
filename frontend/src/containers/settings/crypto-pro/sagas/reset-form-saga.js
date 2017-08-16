import { put } from 'redux-saga/effects';
import { reset } from 'redux-form/immutable';
import {
  FORM_NAME_NEW_CERT
} from '../constants';


export function* resetFormSaga() {
  yield put(reset(FORM_NAME_NEW_CERT));
}
