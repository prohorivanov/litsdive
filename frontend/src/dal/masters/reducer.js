import { fromJS } from 'immutable';
import { ACTIONS } from './constants';


/**
 * собираем все работы авторов
 * @param state
 * @param payload
 */
export const getAllPhotosFromAuthors = (state, payload) => {
  const filterd = payload.filter(author => author.get('tattoo'));
  let arr = fromJS([]);
  filterd.forEach(author => (
      arr = arr.concat(
          author.get('tattoo').map(tattoo => fromJS({
            src: tattoo,
            authorName: author.get('name')
          }))
      )
  ));
  return state.set('tattooPhotosFromAuthors', arr);
}


export const normalizeAuthors = (state, payload) => {
  let newState = state;
  newState = newState.merge({
    authors: payload.filter(author => author.get('tattoo')),
    authorsWithTattoo: payload.filter(author => author.get('tattoo')),
    loader: false
  });

  return getAllPhotosFromAuthors(newState, payload);
}


const initialState = fromJS({
  authors: [],
  tattooPhotosFromAuthors: [],
  tattooList: [],
  loader: false
});

export default function masters(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.MASTERS_GET_AUTHORS_SUCCESS:
      return normalizeAuthors(state, fromJS(action.payload));
    case ACTIONS.MASTERS_GET_AUTHORS_REQUEST:
      return state.set('loader', true);
    case ACTIONS.MASTERS_GET_AUTHORS_FAIL:
      return state.set('loader', false);
    default:
      return state;
  }
}
