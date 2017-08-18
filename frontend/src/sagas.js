import { all } from 'redux-saga/effects'
import dalSagas from 'dal/sagas'
import indexContainerSagas from 'containers/index/sagas'
import productsContainerSagas from 'containers/products/sagas'
import mastersContainerSagas from 'containers/masters/sagas'
import aboutContainerSagas from 'containers/about/sagas'

export default function* rootSaga () {
  yield all([
    dalSagas(),
    indexContainerSagas(),
    productsContainerSagas(),
    mastersContainerSagas(),
    aboutContainerSagas()
  ])
}
