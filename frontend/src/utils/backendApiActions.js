/**
 * Created by drune on 09/03/2017.
 */
import { put, call } from 'redux-saga/effects';

export const ACTION_POSTFIXES = {
  success: '_SUCCESS',
  fail   : '_FAIL'
};

export default function backendApiCall(method, actionTypePosfixes = ACTION_POSTFIXES) {
  return function* backendCall(action) {
    try {
      const data = yield call(method, action.payload);
      yield put({ type: action.type + actionTypePosfixes.success, payload: data });
    } catch (e) {
      yield put({ type: action.type + actionTypePosfixes.fail, payload: e.response });
    }
  };
}
