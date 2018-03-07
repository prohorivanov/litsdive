import { ACTIONS } from './constants'

export const findGalleryByAuthorIDAction = id => ({
  type: ACTIONS.MASTERS_CONTAINER_GET_BY_ID_REQUEST,
  payload: {
    id
  }
})

export const getAllGalleryAction = () => ({
  type: ACTIONS.MASTERS_CONTAINER_GET_ALL_GALLERY_REQUEST
})
export const clearGalleryDetailAction = () => ({
  type: ACTIONS.MASTERS_CONTAINER_CLEAR_GALLERY_DETAIL
})
