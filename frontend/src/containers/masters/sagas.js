import { takeEvery, put, call } from 'redux-saga/effects';
import API from 'app/api';
import { ACTIONS } from './constants';

function* getAuthorByIdSaga(action) {
  const { payload: { slug } } = action;
  try {
    const result = yield call(API.authors.getAuthorById, {
      slug
    });
    const authors = (result && result.data) || [];

    yield put({
      type: ACTIONS.MASTERS_CONTAINER_GET_BY_ID_SUCCESS,
      payload: authors.data
    });
  } catch (error) {
    yield put({ type: ACTIONS.MASTERS_CONTAINER_GET_BY_ID_FAIL, error });
  }
}

export default function* saga() {
  yield takeEvery(ACTIONS.MASTERS_CONTAINER_GET_BY_ID_REQUEST, getAuthorByIdSaga);
}
