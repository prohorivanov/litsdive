import { ACTIONS } from './constants'

/**
 *
 */
export const getPostListAction = () => ({
  type: ACTIONS.POST_GET_LIST_REQUEST
})

/**
 *
 * @param slug
 */
export const getPostAction = slug => ({
  type: ACTIONS.POST_GET_LIST_REQUEST,
  payload: {
    slug
  }
})
