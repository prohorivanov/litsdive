import { all } from 'redux-saga/effects';
import profileSaga from './profile/sagas';
import mastersSaga from './masters/sagas';
import newsSaga from './news/sagas';

export default function* dalSaga() {
  yield all([
    profileSaga(),
    mastersSaga(),
    newsSaga(),
  ]);
}
