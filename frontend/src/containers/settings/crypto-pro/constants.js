import keyMirror from 'keymirror';
import { COLORS } from 'assets/styles/style-vars.js';


export const ACTIONS = keyMirror({
  CRYPTO_PRO_GET_ULK_REQUEST: null,
  CRYPTO_PRO_GET_ULK_SUCCESS: null,
  CRYPTO_PRO_GET_ULK_FAIL: null,
  CRYPTO_PRO_CHANGE_ULK: null,
  CRYPTO_PRO_CHANGE_FIELDS_ERROR: null,

  CRYPTO_CREATE_NEW_CERT_REQUEST: null,
  CRYPTO_CREATE_NEW_CERT_SUCCESS: null,
  CRYPTO_CREATE_NEW_CERT_FAIL: null,

  CRYPTO_OPERATION_DELETE_REQUEST: null,
  CRYPTO_OPERATION_DELETE_SUCCESS: null,
  CRYPTO_OPERATION_DELETE_FAIL: null,

  CRYPTO_OPERATION_REPEAT_REQUEST: null,
  CRYPTO_OPERATION_REPEAT_SUCCESS: null,
  CRYPTO_OPERATION_REPEAT_FAIL: null,

  CRYPTO_OPERATION_SEND_REQUEST: null,
  CRYPTO_OPERATION_SEND_SUCCESS: null,
  CRYPTO_OPERATION_SEND_FAIL: null,

  CRYPTO_SEND_TO_BANK_NEW_CERT_REQUEST: null,
  CRYPTO_SEND_TO_BANK_NEW_CERT_SUCCESS: null,
  CRYPTO_SEND_TO_BANK_NEW_CERT_FAIL: null,

  CRYPTO_OPERATION_SIGN_REQUEST: null,
  CRYPTO_OPERATION_SIGN_SUCCESS: null,
  CRYPTO_OPERATION_SIGN_FAIL: null,

  CRYPTO_PRO_GET_CERT_LIST_REQUEST: null,
  CRYPTO_PRO_GET_CERT_LIST_SUCCESS: null,
  CRYPTO_PRO_GET_CERT_LIST_FAIL: null,

  CRYPTO_PRO_CHANGE_SIGNER_VALUES: null,
  CRYPTO_PRO_RESET_FORM: null,
  CRYPTO_PRO_RESET_FORM_ERROR: null,

  CRYPTO_PRO_FILTERS_CHANGE_STATUS: null,
  CRYPTO_PRO_FILTERS_CLEAR_STATUS: null,
  CRYPTO_PRO_FILTERS_SORT: null,
  CRYPTO_PRO_FILTERS_CHANGE_SORT_VALUE: null,

  CRYPTO_CREATE_PKCS10_REQUEST: null,
  CRYPTO_CREATE_PKCS10_SUCCESS: null,
  CRYPTO_CREATE_PKCS10_FAIL: null,
});

export const FORM_NAME_NEW_CERT = 'createNewCert';
export const FIELD_ULK = 'ULK';
export const FIELD_SIGNER = 'Signer';
export const FIELD_EMAIL = 'Email';
export const FIELD_CITY = 'City';
export const FIELD_COUNTRY = 'Country';
export const FIELD_SUBDIVISION = 'Dep';
export const FIELD_ORGANIZATION = 'OrgName';

export const FILTER_SORT_NEW = 'beginNew';
export const FILTER_SORT_OLD = 'beginOld';
export const FILTER_SORT_START_DATE = 'dateBegin';
export const FILTER_SORT_REQUEST_DATE = 'requestDate';

export const ADDITIONAL_STATUS_EXPIRING = 'expiring';
export const ADDITIONAL_STATUS_NEW_REG_REGEN = 'newReqRegen';
export const ADDITIONAL_STATUS_REISSUE = 'reissue';

export const ENTITY_STATUS_REG_REGEN_ONLY = 'reqRegenOnly';
export const ENTITY_STATUS_REG_NEW_ONLY = 'reqNewOnly';
export const ENTITY_STATUS_REG_WITH_CERT = 'reqWithCert';
export const ENTITY_STATUS_CERT_ONLY = 'certOnly';


export const STATUSES_LABEL = {
  active: 'Активен',
  new: 'Создан',
  signed: 'Подписан',
  sendToBank: 'Запрос отправлен в Банк',
  invalidProps: 'Ошибка реквизитов',
  declinedByBank: 'Отвергнут банком',
  invalidSign: 'Подпись не верна',
  inactive: 'Неактивен',
  reissued: 'Перевыпущен',
  expired: 'Истек',
};

export const STATUSES_COLOR = {
  active: COLORS.colorTrueGreen,
  new: COLORS.colorBlack,
  signed: COLORS.colorBlack,
  sendToBank: COLORS.colorBlack,
  invalidProps: COLORS.colorTomatoRed,
  declinedByBank: COLORS.colorTomatoRed,
  invalidSign: COLORS.colorTomatoRed,
  inactive: COLORS.colorBlack,
  reissued: COLORS.colorBlack,
  expired: COLORS.colorTomatoRed,
  activeExpired: COLORS.colorTangerine,
};

export const ALLOW_OPACITY_STATUSES_COLOR = [
  'new',
  'signed',
  'sendToBank',
  'inactive',
  'reissued'
];

export const ALLOW_SHOW_CERT_DETAIL = [
  'expired',
  'reissued',
  'active',
  'inactive'
];


export const ALLOW_SHOW_REQUEST_DETAIL = [
  ENTITY_STATUS_REG_WITH_CERT
];
