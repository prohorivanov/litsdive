import { all } from 'redux-saga/effects'
import profileSaga from './profile/sagas'
import usersSaga from './users/sagas'
import newsSaga from './news/sagas'

export default function* dalSaga () {
  yield all([
    profileSaga(),
    usersSaga(),
    newsSaga()
  ])
}
