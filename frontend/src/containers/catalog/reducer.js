import { fromJS } from 'immutable'
import { ACTIONS } from './constants'

const initialState = fromJS({
  catalogList: [],
  tagsList: [],
  loader: false
})

export default function catalogContainerReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CATALOG_CONTAINER_GET_LIST_SUCCESS:
      return state
        .set('catalogList', fromJS(action.payload))
        .set('loader', false)
    case ACTIONS.CATALOG_CONTAINER_GET_LIST_FAIL:
      return state.set('loader', false)
    case ACTIONS.CATALOG_CONTAINER_GET_LIST_REQUEST:
      return state.set('loader', true)

    case ACTIONS.CATALOG_CONTAINER_GET_TAGS_SUCCESS:
      return state.set('tagsList', fromJS(action.payload))
    default:
      return state
  }
}
