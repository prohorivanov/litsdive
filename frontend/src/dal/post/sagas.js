import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

/**
 * список постов
 */
function* getPostListSaga () {
  try {
    const result = yield call(API.post.getPostList)
    yield put({
      type: ACTIONS.POST_GET_LIST_SUCCESS,
      payload: (result && result.data) || []
    })
  } catch (error) {
    yield put({type: ACTIONS.POST_GET_LIST_FAIL, error})
  }
}

/**
 * детальный пост
 * @param slug
 */
function* getPostSaga ({ payload: { slug } }) {
  try {
    const result = yield call(API.post.getPost, {slug})
    yield put({
      type: ACTIONS.POST_GET_SUCCESS,
      payload: (result && result.data) || {}
    })
  } catch (error) {
    yield put({type: ACTIONS.POST_GET_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.POST_GET_LIST_REQUEST, getPostListSaga)
  yield takeEvery(ACTIONS.POST_GET_REQUEST, getPostSaga)
}
