import { put, select } from 'redux-saga/effects';
import { initialize } from 'redux-form/immutable';
import { fromJS } from 'immutable';
import { prepareForDropBox } from '../util';
import {
  FORM_NAME_NEW_CERT,
  FIELD_ULK,
  FIELD_SIGNER,
  FIELD_COUNTRY,
  FIELD_SUBDIVISION,
  FIELD_ORGANIZATION
} from '../constants';

import {
  COMBINE_REDUCERS,
  CRYPTO_PRO_REDUCER
} from '../../constants';

const countrySelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'country']);

export function* formCertInit({ payload }) {
  const ulkValues = fromJS(payload);
  const country = yield select(countrySelector);
  const firstUlk = ulkValues.first();
  const firstCps = firstUlk.get('cps').first();

  const ulkValue = prepareForDropBox(firstUlk, 'uldId', 'ulkName');
  const cpsValue = prepareForDropBox(firstCps, 'cpId', 'cpName');
  yield put(
    initialize(
      FORM_NAME_NEW_CERT,
      {
        [FIELD_ULK]: ulkValue,
        [FIELD_SIGNER]: cpsValue,
        [FIELD_COUNTRY]: country,
        [FIELD_SUBDIVISION]: firstUlk.get('dep'),
        [FIELD_ORGANIZATION]: firstUlk.get('orgName'),
      }
    )
  );
}
