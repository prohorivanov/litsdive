import { ACTIONS } from './constants';

export const toggleGlobalLoaderAction = show => ({
  type: ACTIONS.ROOT_CONTAINER_TOGGLE_LOADER,
  payload: {
    show
  }
});

