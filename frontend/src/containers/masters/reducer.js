import { fromJS } from 'immutable'
import { ACTIONS } from './constants'

const initialState = fromJS({
  galleryDetail: {},
  galleriesList: [],
  loader: false
})

export default function mastersContainerReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.MASTERS_CONTAINER_GET_BY_ID_SUCCESS:
      return state
        .set('galleryDetail', fromJS(action.payload))
        .set('loader', false)
    case ACTIONS.MASTERS_CONTAINER_GET_BY_ID_REQUEST:
      return state.set('loader', true)
    case ACTIONS.MASTERS_CONTAINER_GET_BY_ID_FAIL:
      return state.set('loader', false)
    case ACTIONS.MASTERS_CONTAINER_GET_ALL_GALLERY_SUCCESS:
      return state
        .set('galleriesList', fromJS(action.payload))
        .set('loader', false)
    case ACTIONS.MASTERS_CONTAINER_GET_ALL_GALLERY_REQUEST:
      return state.set('loader', true)
    case ACTIONS.MASTERS_CONTAINER_GET_ALL_GALLERY_FAIL:
      return state.set('loader', false)
    default:
      return state
  }
}
