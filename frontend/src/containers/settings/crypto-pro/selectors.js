import { createSelector } from 'reselect';
import { List, OrderedMap } from 'immutable';
import { prepareForDropBox } from './util';

import {
  COMBINE_REDUCERS,
  CRYPTO_PRO_REDUCER
} from '../constants';

import { STATUSES_LABEL } from './constants';

const profileSelector = state => state.get('profile');

const ulcProfilesSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'ulcProfiles']);

// @todo доделать
// берем первый по дефолту
const cpsProfilesSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'ulcProfiles', 0, 'cps']);

const submittingFormSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'submittingForm']);

const certNumberSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'certNumber']);

const newCertStatusesSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'newCertStatuses']);

const createdNewCertDataSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'createdNewCertData']);

const ulcCurrentSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'ulcCurrent']);

const statusSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'certState']);

const loadCertListLoadSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'loadCertListLoad']);

const certListSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'certListRaw']);

const certListFilteredSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'certListFiltered']);

const statusValueSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'filters', 'statusValue']);

const sortValuesSelector = state =>
  state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'sortValues']);

export const ulcValuesSelector = createSelector(
  ulcProfilesSelector,
  ulcProfiles => ulcProfiles.map(ulc => prepareForDropBox(ulc, 'uldId', 'ulkName'))
);

export const cpsValuesSelector = createSelector(
  cpsProfilesSelector,
  (cpsProfiles) => {
    const copyCpsProfiles = cpsProfiles || List();
    return copyCpsProfiles.map(ulc => prepareForDropBox(ulc, 'cpId', 'cpName'));
  }
);


/**
 * статусы для фильтров
 * @type {Reselect.Selector<TInput, TOutput>}
 */
export const statusValuesSelector = createSelector(
  certListSelector,
  (certList) => {
    const certListCopy = certList.size ? certList : List([]);
    let createOrderedMapStatuses = OrderedMap({});
    if (!certListCopy.size) return certListCopy;

    certListCopy.forEach((cert) => {
      if (!createOrderedMapStatuses.has(cert.get('mainStatus'))) {
        createOrderedMapStatuses = createOrderedMapStatuses.set(cert.get('mainStatus'), cert);
      }
    });

    return createOrderedMapStatuses.toList()
      .map(c => c.set('translateStatus', STATUSES_LABEL[c.get('mainStatus')]))
      .map(c => prepareForDropBox(c, 'certId', 'translateStatus'));
  }
);

export const mapStateToProps = state => ({
  profile: profileSelector(state),
  submittingForm: submittingFormSelector(state),
  status: statusSelector(state),
  certNumber: certNumberSelector(state),
  newCertStatuses: newCertStatusesSelector(state),
  createdNewCertData: createdNewCertDataSelector(state),
  ulcCurrent: ulcCurrentSelector(state),
  ulcValues: ulcValuesSelector(state),
  cpsValues: cpsValuesSelector(state),
  certListFiltered: certListFilteredSelector(state),
  loadCertListLoad: loadCertListLoadSelector(state),
  statusValues: statusValuesSelector(state),
  statusValue: statusValueSelector(state),
  sortValue: state.getIn([COMBINE_REDUCERS, CRYPTO_PRO_REDUCER, 'filters', 'sortValue']),
  sortValues: sortValuesSelector(state),
});
