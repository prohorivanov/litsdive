import { fromJS } from 'immutable'
import { ACTIONS } from './constants'

/**
 *
 * @param state
 * @param payload
 */
export const normalizeNews = (state, payload) => (
  state.merge({
    postList: payload,
    loaderPost: false
  })
)

const initialState = fromJS({
  postList: [],
  postDetail: [],
  loaderPost: false,
  loaderNewsDetail: false,
})

export default function post (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.POST_GET_LIST_SUCCESS:
      return normalizeNews(state, fromJS(action.payload))
    case ACTIONS.POST_GET_LIST_REQUEST:
      return state.set('loaderNews', true)
    case ACTIONS.POST_GET_LIST_FAIL:
      return state.set('loaderNews', false)

    case ACTIONS.POST_GET_SUCCESS:
      return state
        .set('postDetail', fromJS(action.payload))
        .set('loaderNewsDetail', false)
    case ACTIONS.POST_GET_REQUEST:
      return state.set('loaderNewsDetail', true)
    case ACTIONS.POST_GET_FAIL:
      return state.set('loaderNewsDetail', false)
    default:
      return state
  }
}
