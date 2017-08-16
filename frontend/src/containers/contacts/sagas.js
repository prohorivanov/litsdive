import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

function* getContactsSaga () {
  try {
    const result = yield call(API.contacts.getContacts)
    const contacts = (result && result.data) || {}

    yield put({
      type: ACTIONS.CONTACTS_CONTAINER_GET_SUCCESS,
      payload: contacts
    })
  } catch (error) {
    yield put({type: ACTIONS.CONTACTS_CONTAINER_GET_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.CONTACTS_CONTAINER_GET_REQUEST, getContactsSaga)
}
