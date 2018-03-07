import keyMirror from 'keymirror'

export const ACTIONS = keyMirror({
  CATALOG_CONTAINER_GET_TAGS_REQUEST: null,
  CATALOG_CONTAINER_GET_TAGS_SUCCESS: null,
  CATALOG_CONTAINER_GET_TAGS_FAIL: null,

  CATALOG_CONTAINER_GET_LIST_REQUEST: null,
  CATALOG_CONTAINER_GET_LIST_SUCCESS: null,
  CATALOG_CONTAINER_GET_LIST_FAIL: null,

  CATALOG_CONTAINER_GET_PR_SLUG_REQUEST: null,
  CATALOG_CONTAINER_GET_PR_SLUG_SUCCESS: null,
  CATALOG_CONTAINER_GET_PR_SLUG_FAIL: null,

  CATALOG_CONTAINER_GET_PR_TAGS_REQUEST: null,
  CATALOG_CONTAINER_GET_PR_TAGS_SUCCESS: null,
  CATALOG_CONTAINER_GET_PR_TAGS_FAIL: null
})

export const LOCAL_REDUCER = 'catalogContainerReducer'
export const LOCAL_SAGAS = 'catalogContainerSagas'