import {
  getFormSyncErrors,
  getFormSubmitErrors,
  getFormValues
}        from 'redux-form/immutable';
import { FORM_NAME }                from './constants';

const profileSelector = state => state.get('profile');

const valueSelector = (state, valueName) => {
  const values = getFormValues(FORM_NAME)(state);
  if (!values) return '';
  return values.get(valueName);
};


export const mapStateToProps = (state) => {
  const profile = profileSelector(state);

  const oldPassword = valueSelector(state, 'old_password');
  const newPassword = valueSelector(state, 'new_password');
  const newPasswordConfirm = valueSelector(state, 'new_password_confirm');
  const isButtonEnabled = oldPassword && newPassword && newPasswordConfirm;

  return {
    profile,
    syncErrors: getFormSyncErrors(FORM_NAME)(state),
    formSubmitErrors: getFormSubmitErrors(FORM_NAME)(state),
    isButtonEnabled
  };
};
