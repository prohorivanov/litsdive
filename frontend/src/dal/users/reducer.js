import { fromJS } from 'immutable'
import { ACTIONS } from './constants'

const initialState = fromJS({
  userList: [],
  loader: false
})

export default function users (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.USERS_GET_AUTHORS_SUCCESS:
      return state.set('userList', fromJS(action.payload))
    case ACTIONS.USERS_GET_AUTHORS_REQUEST:
      return state.set('loader', true)
    case ACTIONS.USERS_GET_AUTHORS_FAIL:
      return state.set('loader', false)
    default:
      return state
  }
}
