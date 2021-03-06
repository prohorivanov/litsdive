import keyMirror from 'keymirror'

export const ACTIONS = keyMirror({
  APPLICATION_ROUTING_ERROR_RESPONSE: null,

  APPLICATION_INIT_REQUEST: null,
  APPLICATION_INIT_SUCCESS: null,
  APPLICATION_INIT_FAIL: null,

  APPLICATION_LOGOUT_REQUEST: null,
  APPLICATION_LOGOUT_SUCCESS: null,
  APPLICATION_LOGOUT_FAIL: null,

  APPLICATION_TOGGLE_GLOBAL_LOADER: null
})
