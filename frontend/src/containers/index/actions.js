import { ACTIONS } from './constants'

export const getNewsAction = () => ({
  type: ACTIONS.INDEX_CONTAINER_GET_NEWS_REQUEST
})

export const getPhotosFromGalleriesAction = () => ({
  type: ACTIONS.INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_REQUEST
})
