import { fromJS } from 'immutable';
import {
    CHANGE_MEDIA_QUERY,
    FIRST_CALL_QUERY
} from './actions';

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
function setCurrentResolution(state, action) {
  return state
      .set('mediaPoint', action.point)
      .set('resolution', action.resolution);
}


/**
 *
 * @param state
 * @param resolution
 * @returns {*}
 */
function firstCallQuery(state, resolution) {
  return state.set('resolution', resolution);
}

/**
 *
 * @param state
 * @param action
 * @returns {*}
 */
const matchMedia = (state = fromJS({
  mediaPoint: 0,
  resolution: ''
}), action) => {
  switch (action.type) {
    case CHANGE_MEDIA_QUERY:
      return setCurrentResolution(state, action);
    case FIRST_CALL_QUERY:
      return firstCallQuery(state, action.resolution);
    default:
      return state;
  }
};

export default matchMedia;
