import { takeEvery, put, call } from 'redux-saga/effects';
import API from 'app/api';
import { ACTIONS } from './constants';

function* getNewsSaga() {
  try {
    const result = yield call(API.news.getNews);
    const authors = (result && result.data) || [];

    yield put({
      type: ACTIONS.INDEX_CONTAINER_GET_NEWS_SUCCESS,
      payload: authors.data
    });
  } catch (error) {
    yield put({ type: ACTIONS.INDEX_CONTAINER_GET_NEWS_FAIL, error });
  }
}

export default function* saga() {
  yield takeEvery(ACTIONS.INDEX_CONTAINER_GET_NEWS_REQUEST, getNewsSaga);
}
