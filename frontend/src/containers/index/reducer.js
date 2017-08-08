import { fromJS } from 'immutable';
import { ACTIONS as MASTERS_CONSTANTS } from 'dal/masters/constants';
import { ACTIONS } from './constants';


export const normalizeAuthors = (state, payload) => {
  const filterd = payload.filter(author => author.get('tattoo'));
  let arr = fromJS([]);
  filterd.forEach(author => (
      arr = arr.concat(
          author.get('tattoo').slice(0, 3).map(tattoo => fromJS({
            src: tattoo,
            authorSlug: author.get('slug'),
            authorName: author.get('name'),
            authorPhoto: author.get('photo'),
            authorPhone: author.get('phone'),
            authorSocialLink: author.get('social'),
          }))
      )
  ));
  return state.set('tattooPhotosFromAuthors', arr);
}

export const normalizeNews = (state, payload) => (
  state.merge({
    newsList: payload,
    loaderNews: false
  })
);


const initialState = fromJS({
  newsList: [],
  tattooPhotosFromAuthors: [],
  loaderNews: false
});

export default function indexContainerReducer(state = initialState, action) {
  switch (action.type) {
    case MASTERS_CONSTANTS.MASTERS_GET_AUTHORS_SUCCESS:
      return normalizeAuthors(state, fromJS(action.payload));
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
