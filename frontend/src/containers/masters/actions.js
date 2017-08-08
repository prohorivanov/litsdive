import { ACTIONS } from './constants';

export const getAuthorsByIdAction = slug => ({
  type: ACTIONS.MASTERS_CONTAINER_GET_BY_ID_REQUEST,
  payload: {
    slug
  }
});