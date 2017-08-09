import keyMirror from 'keymirror'

export const ACTIONS = keyMirror({
  INDEX_CONTAINER_GET_NEWS_REQUEST: null,
  INDEX_CONTAINER_GET_NEWS_SUCCESS: null,
  INDEX_CONTAINER_GET_NEWS_FAIL: null,

  INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_REQUEST: null,
  INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_SUCCESS: null,
  INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_FAIL: null
})

export const REDUCER_NAME = 'indexContainerReducer'
