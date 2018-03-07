import qs from 'qs'
import { fromJS } from 'immutable'
import { history } from 'app/app-history'
import { LOCATION_CHANGE, routerReducer } from 'react-router-redux'
import { ACTIONS } from './constants'

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
const initialRoutingState = fromJS({
  locationBeforeTransitions: null,
  error: null
})

const locationChange = (state, payload) => {
  const locationBeforeTransitions = state.get('locationBeforeTransitions')
  let prevLocation
  if (history.action !== 'REPLACE') {
    prevLocation = locationBeforeTransitions
      ? {
        pathname: locationBeforeTransitions.get('pathname'),
        query: qs.parse(locationBeforeTransitions.get('search')),
        search: locationBeforeTransitions.get('search')
      }
      : null
  } else {
    prevLocation = locationBeforeTransitions
      ? locationBeforeTransitions.get('prevLocation')
      : null
  }

  return routerReducer(
    state.merge({
      locationBeforeTransitions: {
        ...payload,
        action: history.action,
        currentLocation: payload.pathname,
        prevLocation
      }
    })
  )
}

export function routing (state = initialRoutingState, {type, payload} = {}) {
  switch (type) {
    case LOCATION_CHANGE:
      return locationChange(state, payload)
    case ACTIONS.APPLICATION_ROUTING_ERROR_RESPONSE:
      return routerReducer(state.set('error', fromJS(payload.response)))
    default:
      return routerReducer(state)
  }
}

const initialApplicationState = fromJS({
  isInitialized: false,
  isGlobalLoading: false
})

export function application (state = initialApplicationState, action) {
  switch (action.type) {
    case ACTIONS.APPLICATION_INIT_SUCCESS:
      return state.set('isInitialized', true)
    case ACTIONS.APPLICATION_TOGGLE_GLOBAL_LOADER:
      return state.set('isGlobalLoading', action.payload.show)
    default:
      return state
  }
}
