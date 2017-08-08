import keyMirror from 'keymirror';

export const ACTIONS = keyMirror({
  CHANGE_PASS_REQUEST: null,
  CHANGE_PASS_SUCCESS: null,
  CHANGE_PASS_FAIL: null,

  CHANGE_PASS_VALIDATION: null,
});

export const FORM_NAME = 'SettingsLayoutForm';
export const FIELD_OLD_PASSWORD = 'old_password';
export const FIELD_NEW_PASSWORD = 'new_password';
export const FIELD_NEW_PASSWORD_CONFIRM = 'new_password_confirm';
