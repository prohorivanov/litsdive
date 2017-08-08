import { put, select, call, takeLatest } from 'redux-saga/effects';
import API from 'app/api';
import { delay } from 'redux-saga';
import {
  startSubmit,
  stopSubmit,
  getFormValues,
  reset
} from 'redux-form/immutable';
import { profileLogoutAction } from 'dal/profile/actions';
import { match }  from 'utils/validation';
import {
  ACTIONS,
  FORM_NAME,
  FIELD_OLD_PASSWORD,
  FIELD_NEW_PASSWORD,
  FIELD_NEW_PASSWORD_CONFIRM
} from './constants';

export function* beforeSubmitValidationSaga() {
  const values = yield select(getFormValues(FORM_NAME));

  try {
    if ((values.has(FIELD_OLD_PASSWORD) && values.has(FIELD_NEW_PASSWORD)) &&
      (values.get(FIELD_OLD_PASSWORD) === values.get(FIELD_NEW_PASSWORD))) {
      yield put(reset(FORM_NAME));
      yield put(
        stopSubmit(
          FORM_NAME,
          {
            [FIELD_NEW_PASSWORD]: 'Новый пароль совпадает со старым',
            _error: 'Новый пароль совпадает со старым!'
          }
        )
      );

      return false;
    }

    if (match(values.get(FIELD_NEW_PASSWORD), values.get(FIELD_NEW_PASSWORD_CONFIRM))) {
      yield put(reset(FORM_NAME));
      yield put(
        stopSubmit(
          FORM_NAME,
          {
            [FIELD_NEW_PASSWORD]: 'Новые пароли не совпадают',
            [FIELD_NEW_PASSWORD_CONFIRM]: 'Новые пароли не совпадают',
            _error: 'Новые пароли не совпадают'
          }
        )
      );
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
}

/**
 * Обновляем пароль
 */
export function* changePasswordSaga() {
  const formValues = yield select(getFormValues(FORM_NAME));

  try {
    yield startSubmit(FORM_NAME);
    const validate = yield beforeSubmitValidationSaga();
    if (!validate) { return; }

    yield call(API.authentication.updatePassword, {
      currentPassword: formValues.get(FIELD_OLD_PASSWORD),
      newPassword: formValues.get(FIELD_NEW_PASSWORD)
    });

    yield stopSubmit(FORM_NAME, {});
    yield delay(1000);
    yield put(profileLogoutAction());
  } catch (error) {
    const errorData = error.response && error.response.data;
    yield put(
      stopSubmit(FORM_NAME, {
        _error: errorData.error
      })
    );
  }
}

export default function* changePasswordSagas() {
  yield takeLatest(ACTIONS.CHANGE_PASS_REQUEST, changePasswordSaga);
  yield takeLatest(ACTIONS.CHANGE_PASS_VALIDATION, beforeSubmitValidationSaga);
}
