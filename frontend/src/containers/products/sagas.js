import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

function* getProductsSaga () {
  try {
    const result = yield call(API.products.getListProducts)
    const products = (result && result.data) || []
    yield put({
      type: ACTIONS.PRODUCTS_CONTAINER_GET_LIST_SUCCESS,
      payload: products.data || []
    })
  } catch (error) {
    yield put({type: ACTIONS.PRODUCTS_CONTAINER_GET_LIST_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.PRODUCTS_CONTAINER_GET_LIST_REQUEST, getProductsSaga)
}
