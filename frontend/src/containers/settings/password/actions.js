import { ACTIONS } from './constants';

/**
 * default values
 * @param params
 */
export const changePasswordAction = params => ({
  type: ACTIONS.CHANGE_PASS_REQUEST,
  payload: params
});
