import { fromJS } from 'immutable';
import { ACTIONS } from './constants';

/**
 *
 * @param state
 * @param payload
 */
export const normalizeNews = (state, payload) => (
  state.merge({
    newsList: payload,
    loaderNews: false
  })
);


const initialState = fromJS({
  newsList: [],
  loaderNews: false
});

export default function news(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.INDEX_CONTAINER_GET_NEWS_SUCCESS:
      return normalizeNews(state, fromJS(action.payload));
    case ACTIONS.INDEX_CONTAINER_GET_NEWS_REQUEST:
      return state.set('loaderNews', true);
    case ACTIONS.INDEX_CONTAINER_GET_NEWS_FAIL:
      return state.set('loaderNews', false);
    default:
      return state;
  }
}
