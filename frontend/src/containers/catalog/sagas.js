import { takeEvery, put, call } from 'redux-saga/effects'
import API from 'app/api'
import { ACTIONS } from './constants'

/**
 * список всех товаров
 */
function* getProductsSaga () {
  try {
    const result = yield call(API.products.getListProducts)
    const products = (result && result.data) || []
    yield put({
      type: ACTIONS.CATALOG_CONTAINER_GET_LIST_SUCCESS,
      payload: products.data || []
    })
  } catch (error) {
    yield put({type: ACTIONS.CATALOG_CONTAINER_GET_LIST_FAIL, error})
  }
}

/**
 * получить товар по slug
 * @param payload
 */
function* getProductsBySlugSaga ({ payload }) {
  try {
    const result = yield call(API.products.getProductBySlug, {
      slug: payload.slug
    })
    yield put({
      type: ACTIONS.CATALOG_CONTAINER_GET_PR_SLUG_SUCCESS,
      payload: (result && result.data) || {}
    })
  } catch (error) {
    yield put({type: ACTIONS.CATALOG_CONTAINER_GET_PR_SLUG_FAIL, error})
  }
}

/**
 * товары по тегам
 * @param payload
 */
function* getProductsByTagsSaga ({ payload }) {
  try {
    const result = yield call(API.products.getProductsByTags, {
      tags: payload.tags
    })
    yield put({
      type: ACTIONS.CATALOG_CONTAINER_GET_PR_TAGS_SUCCESS,
      payload: (result && result.data) || {}
    })
  } catch (error) {
    yield put({type: ACTIONS.CATALOG_CONTAINER_GET_PR_TAGS_FAIL, error})
  }
}

/**
 * получаем все теги каталога
 */
function* getProductsTagsSaga () {
  try {
    const result = yield call(API.products.getProductsTags)
    yield put({
      type: ACTIONS.CATALOG_CONTAINER_GET_TAGS_SUCCESS,
      payload: (result && result.data) || []
    })
  } catch (error) {
    yield put({type: ACTIONS.CATALOG_CONTAINER_GET_TAGS_FAIL, error})
  }
}

export default function* saga () {
  yield takeEvery(ACTIONS.CATALOG_CONTAINER_GET_LIST_REQUEST, getProductsSaga)
  yield takeEvery(ACTIONS.CATALOG_CONTAINER_GET_PR_SLUG_REQUEST, getProductsBySlugSaga)
  yield takeEvery(ACTIONS.CATALOG_CONTAINER_GET_PR_TAGS_REQUEST, getProductsByTagsSaga)
  yield takeEvery(ACTIONS.CATALOG_CONTAINER_GET_TAGS_REQUEST, getProductsTagsSaga)
}
