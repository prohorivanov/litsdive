import { put, all } from 'redux-saga/effects';
import { change }  from 'redux-form/immutable';
import { prepareForDropBox } from '../util';
import {
  ACTIONS,
  FORM_NAME_NEW_CERT,
  FIELD_ULK,
  FIELD_SIGNER,
  FIELD_SUBDIVISION,
  FIELD_ORGANIZATION
} from '../constants';

/**
 *
 * @param payload
 */
export function* changeUlkSaga({ payload }) {
  try {
    const cps = payload.get('cps');
    const cpsValue = cps.map(c => prepareForDropBox(c, 'cpId', 'cpName'));

    yield all([
      put(
        change(
          FORM_NAME_NEW_CERT,
          FIELD_ULK,
          payload,
          false,
          true
        )
      ),
      put(
        change(
          FORM_NAME_NEW_CERT,
          FIELD_SIGNER,
          cpsValue.first(),
          false,
          true
        )
      ),
      put(
        change(
          FORM_NAME_NEW_CERT,
          FIELD_SUBDIVISION,
          payload.get('dep'),
          false,
          true
        )
      ),
      put(
        change(
          FORM_NAME_NEW_CERT,
          FIELD_ORGANIZATION,
          payload.get('orgName'),
          false,
          true
        )
      ),
      put({
        type: ACTIONS.CRYPTO_PRO_CHANGE_SIGNER_VALUES,
        payload: cpsValue
      })
    ]);
  } catch (error) {
    yield put({ type: ACTIONS.CRYPTO_PRO_CHANGE_FIELDS_ERROR, error: error.message });
  }
}
