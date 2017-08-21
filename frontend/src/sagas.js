import { all } from 'redux-saga/effects'
import dalSagas from 'dal/sagas'
import indexContainerSagas from 'containers/index/sagas'
import catalogContainerSagas from 'containers/catalog/sagas'
import mastersContainerSagas from 'containers/masters/sagas'
import aboutContainerSagas from 'containers/about/sagas'

export default function* rootSaga () {
  yield all([
    dalSagas(),
    indexContainerSagas(),
    catalogContainerSagas(),
    mastersContainerSagas(),
    aboutContainerSagas()
  ])
}
