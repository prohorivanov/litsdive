import { fromJS } from 'immutable'
import { ACTIONS } from './constants'

const initialState = fromJS({
  gallery: {},
  loader: false
})

export default function aboutContainerReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ABOUT_CONTAINER_GET_GALLERY_SUCCESS:
      return state
        .set('gallery', fromJS(action.payload))
        .set('loader', false)
    case ACTIONS.ABOUT_CONTAINER_GET_GALLERY_REQUEST:
      return state.set('loader', true)
    case ACTIONS.ABOUT_CONTAINER_GET_GALLERY_FAIL:
      return state.set('loader', false)
    default:
      return state
  }
}
