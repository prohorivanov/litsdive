import { takeEvery, put, call } from 'redux-saga/effects';
import API from 'app/api';
import { ACTIONS } from './constants';

function* getAuthorsSaga() {
  try {
    const result = yield call(API.authors.getAllAuthor);
    const authors = (result && result.data) || [];

    yield put({
      type: ACTIONS.MASTERS_GET_AUTHORS_SUCCESS,
      payload: authors.data || []
    });
  } catch (error) {
    yield put({ type: ACTIONS.MASTERS_GET_AUTHORS_FAIL, error });
  }
}

export default function* saga() {
  yield takeEvery(ACTIONS.MASTERS_GET_AUTHORS_REQUEST, getAuthorsSaga);
}
