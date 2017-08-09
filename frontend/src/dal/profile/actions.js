import { ACTIONS }  from './constants'

/**
 * Оповещает API о выходе пользователя из системы
 * @return {[type]} [description]
 */
export const profileLogoutAction = () => ({
  type: ACTIONS.PROFILE_LOGOUT_REQUEST
})
