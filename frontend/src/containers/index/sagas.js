import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

function* getAllGalleriesSaga () {
  try {
    const result = yield call(API.gallery.getAllGalleries)
    yield put({
      type: ACTIONS.INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_SUCCESS,
      payload: (result && result.data) || []
    })
  } catch (error) {
    yield put({type: ACTIONS.INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_FAIL, error})
  }
}

function* getNewsSaga () {
  try {
    const result = yield call(API.news.getNews)
    yield put({
      type: ACTIONS.INDEX_CONTAINER_GET_NEWS_SUCCESS,
      payload: (result && result.data) || []
    })
  } catch (error) {
    yield put({type: ACTIONS.INDEX_CONTAINER_GET_NEWS_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.INDEX_CONTAINER_GET_NEWS_REQUEST, getNewsSaga)
  yield takeEvery(ACTIONS.INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_REQUEST, getAllGalleriesSaga)
}
