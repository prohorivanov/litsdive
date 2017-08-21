import { ACTIONS } from './constants'

/**
 * все товары
 */
export const getCatalogsAction = () => ({
  type: ACTIONS.CATALOG_CONTAINER_GET_LIST_REQUEST
})

/**
 * список тегов
 */
export const getCatalogTagsAction = () => ({
  type: ACTIONS.CATALOG_CONTAINER_GET_TAGS_REQUEST
})

/**
 *
 * @param slug
 */
export const getCatalogBySlugAction = slug => ({
  type: ACTIONS.CATALOG_CONTAINER_GET_PR_SLUG_REQUEST,
  payload: {
    slug
  }
})

/**
 *
 * @param tags
 */
export const getCatalogsByTagsAction = tags => ({
  type: ACTIONS.CATALOG_CONTAINER_GET_PR_TAGS_REQUEST,
  payload: {
    tags
  }
})
