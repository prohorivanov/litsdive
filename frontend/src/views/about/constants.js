import keyMirror from 'keymirror'

export const ACTIONS = keyMirror({
  ABOUT_CONTAINER_GET_GALLERY_REQUEST: null,
  ABOUT_CONTAINER_GET_GALLERY_SUCCESS: null,
  ABOUT_CONTAINER_GET_GALLERY_FAIL: null
})

export const LOCAL_REDUCER = 'aboutContainerReducer'
export const LOCAL_SAGAS = 'aboutContainerSagas'
