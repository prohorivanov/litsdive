import { isObject, isFunction, conformsTo } from 'lodash'
import invariant from 'invariant'

/**
 * Validate the shape of redux store
 */
export default function checkStore (store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    runSaga: isFunction,
    injectedSagas: isObject,
    injectedReducers: isObject
  }
  invariant(
    conformsTo(store, shape),
    '(app/utils...) injectors: Expected a valid redux store'
  )
}
