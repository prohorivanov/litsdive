import { fromJS } from 'immutable';
import { reducer as form } from 'redux-form/immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import rootReducer   from './root/reducer';
import profile from './profile/reducer';
import matchMedia from './match-media/reducer';
import masters from './masters/reducer';
import news from './news/reducer';

const initialState            = fromJS({
  locationBeforeTransitions: null
});

/**
 * This reducer will update the state with the most recent location history
 * has transitioned to. This may not be in sync with the router, particularly
 * if you have asynchronously-loaded routes, so reading from and relying on
 * this state is discouraged.
 */
export function routing(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    const locationBeforeTransitions = state.get('locationBeforeTransitions');
    let prevLocation;
    
    if (payload.action !== 'REPLACE') {
      prevLocation = locationBeforeTransitions ?
      {
        pathname: locationBeforeTransitions.get('pathname'),
        query: locationBeforeTransitions.get('query'),
        search: locationBeforeTransitions.get('search')
      } : null;
    } else {
      prevLocation = locationBeforeTransitions.get('prevLocation');
    }

    return state.merge({
      locationBeforeTransitions: {
        ...payload,
        currentLocation: payload.pathname,
        prevLocation
      }
    });
  }
  return state;
}

/**
 *
 * @param asyncReducers
 * @returns {Function}
 */
export default {
  form,
  routing,
  rootReducer,
  profile,
  matchMedia,
  masters,
  news
};
