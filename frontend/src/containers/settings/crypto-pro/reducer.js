import { fromJS } from 'immutable';
import { flowRight } from 'lodash';
import moment from 'moment-timezone';
import {
  ACTIONS,
  FILTER_SORT_START_DATE,
  FILTER_SORT_REQUEST_DATE,
  FILTER_SORT_NEW,
  FILTER_SORT_OLD,
  ENTITY_STATUS_REG_REGEN_ONLY,
  ENTITY_STATUS_REG_NEW_ONLY,
  ENTITY_STATUS_CERT_ONLY,
  ENTITY_STATUS_REG_WITH_CERT
} from './constants';


/**
 *
 * @param state
 * @param payload
 */
export function createdNewCert(state, payload) {
  const dataNewCert = payload.get('dataNewCert');
  const createPKCS10Result = payload.get('createPKCS10Result');
  return state.merge({
    submittingForm: false,
    newCertStatuses: {
      cryptoPluginWork: true,
      sendToBank: false,
    },
    certState: dataNewCert.get('certState'),
    createdNewCertData: dataNewCert.set('certState', 'Создан'),
    createPKCS10Result
  });
}

/**
 *
 * @param certList
 */
export const normalizeCertItem = certList => (
  certList.map(cert =>
    flowRight([
      normalizeCertItemOperations,
      normalizeCertDetailImportantMessage
    ])(cert)
  )
);

/**
 * свойтва для показа иконок и кнопок операций
 * @param cert
 */
export function normalizeCertItemOperations(cert) {
  const status = cert.get('mainStatus');
  const type = cert.get('entityType');
  const operations = {
    // перевыпуск
    repeat: (status === 'active' || status === 'expired')
    && (type === ENTITY_STATUS_REG_WITH_CERT || type === ENTITY_STATUS_CERT_ONLY),

    // удалить
    remove: status === 'new' && (type === ENTITY_STATUS_REG_NEW_ONLY ||
    type === ENTITY_STATUS_REG_REGEN_ONLY),

    // отправить в банк
    send: (status === 'new' && type === ENTITY_STATUS_REG_NEW_ONLY) ||
    (status === 'signed' && type === ENTITY_STATUS_REG_REGEN_ONLY),

    // подписать
    sign: status === 'new'  && type === ENTITY_STATUS_REG_REGEN_ONLY
  };
  return cert.merge({ operations });
}

/**
 * Отображение нотификации во всплывающем окне ( детальная информация по сертификату )
 * @link https://confluence.raiffeisen.ru/pages/viewpage.action?pageId=103363272
 * @param certList
 */
export function normalizeCertDetailImportantMessage(cert) {
  const status = cert.get('mainStatus');
  const type = cert.get('entityType');
  let importantMessage = '';

  if (status === 'new' && type === ENTITY_STATUS_REG_NEW_ONLY) {
    importantMessage = 'Запрос создан, необходимо отправить его в банк.';
  }

  if (status === 'new' && type === ENTITY_STATUS_REG_REGEN_ONLY) {
    importantMessage = 'Запрос создан, необходимо подписать его и отправить в банк.';
  }

  if (status === 'signed' && type === ENTITY_STATUS_REG_REGEN_ONLY) {
    importantMessage = 'Запрос создан и подписан, необходимо отправить его в банк.';
  }

  if (status === 'sendToBank' && (type === ENTITY_STATUS_REG_REGEN_ONLY || type === ENTITY_STATUS_REG_NEW_ONLY)) {
    importantMessage = `
        Запрос отправлен в банк. Распечатайте его, заверьте печатью и подписью и предоставьте в отделение банка. 
        После предъявления бумажного экземпляра сертификат будет активирован в течении рабочего дня.
      `;
  }

  if (
    (status === 'invalidProps' || status === 'declinedByBank' || status === 'invalidSign') &&
    (type === ENTITY_STATUS_REG_REGEN_ONLY || type === ENTITY_STATUS_REG_NEW_ONLY)) {
    importantMessage = 'Запрос не обработан. Проверьте данные и повторите попытку.';
  }

  if (status === 'inactive' &&
    (type === ENTITY_STATUS_CERT_ONLY || type === ENTITY_STATUS_REG_WITH_CERT)) {
    importantMessage = `
        Сертификат не активен с ${moment(cert.get('certStatusChangeDate')).format('DD.MM.YYYY')} 
        Причина: ${cert.get('certStatusChangeReason')}
      `;
  }
  return cert.merge({ importantMessage });
}

/**
 *
 * @param state
 * @param id
 */
export const deleteCert = (state, id) => (
  state.update('certListFiltered', certList => (
    certList.delete(
      state.get('certListFiltered')
        .findIndex(c => c.get('requestId') === id)
    )
  ))
);

/**
 *
 * @param date1
 * @param date2
 * @returns {number}
 */
const sortByDateAsc = (date1, date2) => {
  if (!date1.isValid() || !date2.isValid()) return -1;
  if (date1 < date2) return 1;
  if (date1 > date2) return -1;
  return 0;
};

/**
 *
 * @param date1
 * @param date2
 * @returns {number}
 */
const sortByDateDesc = (date1, date2) => {
  if (!date1.isValid() || !date2.isValid()) return -1;
  if (date1 > date2) return 1;
  if (date1 < date2) return -1;
  return 0;
};


/**
 *
 * @param list
 * @param sortDirection
 */
const sortCertList = (list, sortDirection) => (
  list.sort((a, b) => {
    const c = moment(a.get(FILTER_SORT_START_DATE) || a.get(FILTER_SORT_REQUEST_DATE));
    const d = moment(b.get(FILTER_SORT_START_DATE) || b.get(FILTER_SORT_REQUEST_DATE));
    return sortDirection === FILTER_SORT_NEW
      ? sortByDateAsc(c, d)
      : sortByDateDesc(c, d);
  })
);


/**
 * фильтруем список по статусу
 * @param state
 */
export const filterByStatusCert = (state) => {
  const mainStatus = state.getIn(['filters', 'statusValue', 'mainStatus']);

  if (!mainStatus) {
    return state;
  }

  return state
    .update('certListFiltered', () => (
      state.get('certListRaw')
        .filter(c => c.get('mainStatus') === mainStatus)
    ));
};

/**
 *
 * @param state
 */
export const clearFilterStatusCert = state => (
  state
    .setIn(['filters', 'statusValue'], fromJS({}))
    .set('certListFiltered', sortCertList(state.get('certListRaw')), state.getIn(['filters', 'sortDirection']))
);

/**
 *
 * @param state
 */
export const sortCert = (state, sortDirection) => (
  state
    .setIn(['filters', 'sortDirection'], sortDirection)
    .update('certListFiltered', certListFiltered => (
        sortCertList(certListFiltered, sortDirection)
      )
    )
);

/**
 *
 * @param state
 * @param certList
 */
export const prepareCertList = (state, certList) => {
  const normalizeList = normalizeCertItem(certList);
  return state
    .set('certListRaw', normalizeList)
    .set('certListFiltered', sortCertList(normalizeList, state.getIn(['filters', 'sortDirection'])))
    .set('loadCertListLoad', false);
};

/**
 *
 * @param state
 * @returns {*}
 */
export const sendToBankNewCertSuccess = (state) => {
  const cryptoPluginWork = state.getIn(['newCertStatuses', 'cryptoPluginWork']);
  return state
    .setIn(['createdNewCertData', 'certState'], 'отправлен в банк')
    .setIn(['newCertStatuses', 'sendToBank'], cryptoPluginWork);
};

const initialState = fromJS({
  ulcProfiles: [],
  cpsValues: [],
  certListRaw: [],
  certListFiltered: [],
  certState: 'новый',
  certNumber: 2,
  country: 'Россия',
  newCertStatuses: {
    cryptoPluginWork: false,
    sendToBank: false,
  },
  createdNewCertData: {},
  createPKCS10Result: {},
  statusValues: [],
  sortValues: [{
    value: 0,
    title: 'Сначала новые',
    sortDirection: FILTER_SORT_NEW
  }, {
    value: 0,
    title: 'Сначала старые',
    sortDirection: FILTER_SORT_OLD
  }],
  submittingForm: false,
  loadCertListLoad: false,
  filters: {
    statusValue: {},
    sortValue: {
      value: 0,
      title: 'Сначала новые',
      sortDirection: FILTER_SORT_NEW
    },
    sortDirection: FILTER_SORT_NEW
  }
});

export default function cryptoProSettingsReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CRYPTO_CREATE_NEW_CERT_REQUEST:
      return state.set('submittingForm', true);
    case ACTIONS.CRYPTO_CREATE_NEW_CERT_FAIL:
      return state.set('submittingForm', false);
    case ACTIONS.CRYPTO_CREATE_NEW_CERT_SUCCESS:
      return createdNewCert(state, fromJS(action.payload));

    case ACTIONS.CRYPTO_SEND_TO_BANK_NEW_CERT_SUCCESS:
      return sendToBankNewCertSuccess(state, fromJS(action.payload));

    case ACTIONS.CRYPTO_OPERATION_DELETE_SUCCESS:
      return deleteCert(state, action.payload);

    case ACTIONS.CRYPTO_PRO_FILTERS_CHANGE_STATUS:
      return filterByStatusCert(
        state.setIn(['filters', 'statusValue'], action.payload.value)
      );

    case ACTIONS.CRYPTO_PRO_FILTERS_CHANGE_SORT_VALUE:
      return state.setIn(['filters', 'sortValue'], action.payload.value);

    case ACTIONS.CRYPTO_PRO_FILTERS_CLEAR_STATUS:
      return clearFilterStatusCert(state);
    case ACTIONS.CRYPTO_PRO_FILTERS_SORT:
      return sortCert(state, action.payload.dateValue);

    case ACTIONS.CRYPTO_PRO_GET_CERT_LIST_REQUEST:
      return state.set('loadCertListLoad', true);
    case ACTIONS.CRYPTO_PRO_GET_CERT_LIST_FAIL:
      return state.set('loadCertListLoad', false);
    case ACTIONS.CRYPTO_PRO_GET_CERT_LIST_SUCCESS:
      return prepareCertList(state, fromJS(action.payload));

    case ACTIONS.CRYPTO_PRO_GET_ULK_SUCCESS:
      return state.set('ulcProfiles', fromJS(action.payload));
    case ACTIONS.CRYPTO_PRO_CHANGE_SIGNER_VALUES:
      return state.set('cpsValues', fromJS(action.payload));
    case ACTIONS.CRYPTO_PRO_RESET_FORM:
      return state.merge({
        cpsValues: [],
        ulcProfiles: [],
        certState: '',
        certNumber: 0,
        createdNewCertData: {},
        createPKCS10Result: {},
        newCertStatuses: {
          cryptoPluginWork: false,
          sendToBank: false,
        }
      });
    default:
      return state;
  }
}
