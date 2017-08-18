import { all } from 'redux-saga/effects'
import profileSaga from './profile/sagas'
import usersSaga from './users/sagas'
import postSaga from './post/sagas'
import contactsSaga from './contacts/sagas'

export default function* dalSaga () {
  yield all([
    profileSaga(),
    usersSaga(),
    contactsSaga(),
    postSaga()
  ])
}
