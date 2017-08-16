import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

function* getAuthorsSaga () {
  try {
    const result = yield call(API.authors.getAllAuthor)
    const data = (result && result.data)
    if (!data || !data.length) throw new Error('error no found users')
    yield put({
      type: ACTIONS.USERS_GET_AUTHORS_SUCCESS,
      payload: data || []
    })
  } catch (error) {
    yield put({type: ACTIONS.USERS_GET_AUTHORS_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.USERS_GET_AUTHORS_REQUEST, getAuthorsSaga)
}
