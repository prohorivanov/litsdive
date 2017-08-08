import { put, call, takeEvery, select }   from 'redux-saga/effects';
import API                                from 'app/api';
import { ACTIONS }                        from './constants';
import { profileLogoutAction }            from './actions';

export const selectedOrgsSelector = state => state.getIn(['profile', 'settings', 'selected_orgs']);

export function* checkAuthentication(action) {
  if (action.type.endsWith('LOAD_FAIL') && action.payload && action.payload.status && action.payload.status === 401) {
    yield put(profileLogoutAction());
  }
}


export function* logout() {
  try {
    const logoutSuccess = yield call(API.authentication.logout);
    yield put({ type: ACTIONS.PROFILE_LOGOUT_SUCCESS, payload: logoutSuccess });
  } catch (e) {
    yield put({type: ACTIONS.PROFILE_LOGOUT_FAIL, payload: e.response});
  }
}

export function* profileLoadSuccess() {
  const selectedOrgs = yield select(selectedOrgsSelector);
  if (selectedOrgs.size === 0) {
    yield put({ type: ACTIONS.PROFILE_SETTINGS_ADD_ALL_ORG, payload: { selectedOrgs } });
  }
}

export default function* profileSaga() {
  yield takeEvery('*', checkAuthentication);
  yield takeEvery(ACTIONS.PROFILE_LOAD_SUCCESS, profileLoadSuccess);
  yield takeEvery(ACTIONS.PROFILE_LOGOUT_REQUEST, logout);
}
