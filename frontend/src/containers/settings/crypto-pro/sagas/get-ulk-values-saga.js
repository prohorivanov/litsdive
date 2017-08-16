/* eslint-disable */
import { put, /* call */ } from 'redux-saga/effects';
// import API from 'app/api';
import { ACTIONS } from '../constants';

const ULK = [
  {
    "uldId": "1321321321321321321",
    "ulkName": "Суслова Екатерина-Виктория Вячеславовна",
    "orgName": "Местная религиозная организация",
    "orgINN": "1234567890",
    "dep": "Операционный офис Зашекснинский",
    "cps": [
      {
        "cpId": "11111111111111111111111111111111",
        "cpName": "Общественная организация"
      },
      {
        "cpId": "11111111111111111111111111111111",
        "cpName": "Местная религиозная организация"
      },
      {
        "cpId": "11111111111111111111111111111111",
        "cpName": "МАРУШИНА СВЕТЛАНА АЛЕКСАНДРОВНА"
      }
    ]
  },
  {
    "uldId": "1131321321321131321321",
    "ulkName": "Благовещенский Александр Владимирович",
    "orgName": "Абашкин Алексей Анатольевич",
    "orgINN": "0987654321",
    "dep": "Отделение Профсоюзное",
    "cps": [
      {
        "cpId": "22222222222222222222222",
        "cpName": "ФКУ ГБ МСЭ по Краснодарскому"
      },
      {
        "cpId": "22222222222222222222222",
        "cpName": "Семенюк Александр Александрович"
      }
    ]
  }
];

export function* getUlkValuesSaga() {
  try {
    // const result = yield call(API.settings.getUlk);
    const ulc = ULK; // result.data || [];
    yield put({
      type: ACTIONS.CRYPTO_PRO_GET_ULK_SUCCESS,
      payload: ulc
    });
  } catch (error) {
    yield put({ type: ACTIONS.CRYPTO_PRO_GET_ULK_FAIL });
  }
}
