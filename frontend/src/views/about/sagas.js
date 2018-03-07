import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

function* getGallerySaga () {
  try {
    const result = yield call(API.gallery.getGalleriesByName, { name: 'about' })
    yield put({
      type: ACTIONS.ABOUT_CONTAINER_GET_GALLERY_SUCCESS,
      payload: (result && result.data) || {}
    })
  } catch (error) {
    yield put({type: ACTIONS.ABOUT_CONTAINER_GET_GALLERY_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.ABOUT_CONTAINER_GET_GALLERY_REQUEST, getGallerySaga)
}
