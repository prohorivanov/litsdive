import { ACTIONS } from './constants'

/**
 *    action инициализации приложения
 */
export const applicationInitAction = () => ({
  type: ACTIONS.APPLICATION_INIT_REQUEST
})

export const toggleGlobalLoaderAction = show => ({
  type: ACTIONS.APPLICATION_TOGGLE_GLOBAL_LOADER,
  payload: {
    show
  }
})

export const logoutAction = () => ({
  type: ACTIONS.APPLICATION_LOGOUT_REQUEST
})
