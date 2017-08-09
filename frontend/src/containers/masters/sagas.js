import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

function* getGalleryAuthorByIdSaga (action) {
  const {payload: {id}} = action
  try {
    const result = yield call(API.gallery.findGalleryByAuthorId, {
      id
    })
    yield put({
      type: ACTIONS.MASTERS_CONTAINER_GET_BY_ID_SUCCESS,
      payload: (result && result.data) || {}
    })
  } catch (error) {
    yield put({type: ACTIONS.MASTERS_CONTAINER_GET_BY_ID_FAIL, error})
  }
}

function* getAllGalleriesSaga () {
  try {
    const result = yield call(API.gallery.getAllGalleries)
    yield put({
      type: ACTIONS.MASTERS_CONTAINER_GET_ALL_GALLERY_SUCCESS,
      payload: (result && result.data) || []
    })
  } catch (error) {
    yield put({type: ACTIONS.MASTERS_CONTAINER_GET_ALL_GALLERY_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.MASTERS_CONTAINER_GET_BY_ID_REQUEST, getGalleryAuthorByIdSaga)
  yield takeEvery(ACTIONS.MASTERS_CONTAINER_GET_ALL_GALLERY_REQUEST, getAllGalleriesSaga)
}
