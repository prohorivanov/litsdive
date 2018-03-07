import { all } from 'redux-saga/effects'
import dalSagas from 'dal/sagas'
import indexContainerSagas from 'views/index/sagas'
import catalogContainerSagas from 'views/catalog/sagas'
import mastersContainerSagas from 'views/masters/sagas'
import aboutContainerSagas from 'views/about/sagas'

export default function* rootSaga () {
  yield all([
    dalSagas(),
    indexContainerSagas(),
    catalogContainerSagas(),
    mastersContainerSagas(),
    aboutContainerSagas()
  ])
}
