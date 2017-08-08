import { ACTIONS }  from './constants';

export const getAuthorsAction = userSlug => ({
  type: ACTIONS.MASTERS_GET_AUTHORS_REQUEST,
  payload: {
    userSlug
  }
});
