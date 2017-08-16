import { ACTIONS } from './constants';

/**
 * default values
 * @param params
 */
export const getValuesUlkAction = params => ({
  type: ACTIONS.CRYPTO_PRO_GET_ULK_REQUEST,
  payload: params
});

export const getCertListAction = params => ({
  type: ACTIONS.CRYPTO_PRO_GET_CERT_LIST_REQUEST,
  payload: params
});

export const changeUlkAction = value => ({
  type: ACTIONS.CRYPTO_PRO_CHANGE_ULK,
  payload: value
});

export const createNewCertAction = params => ({
  type: ACTIONS.CRYPTO_CREATE_NEW_CERT_REQUEST,
  payload: params
});

/**
 *
 * @param {string} id
 */
export const deleteCertAction = id => ({
  type: ACTIONS.CRYPTO_OPERATION_DELETE_REQUEST,
  payload: {
    id
  }
});

export const repeatCertAction = id => ({
  type: ACTIONS.CRYPTO_OPERATION_REPEAT_REQUEST,
  payload: {
    id
  }
});

export const sendToBankCertAction = id => ({
  type: ACTIONS.CRYPTO_OPERATION_SEND_REQUEST,
  payload: {
    id
  }
});


export const sendToBankNewCertAction = certData => ({
  type: ACTIONS.CRYPTO_SEND_TO_BANK_NEW_CERT_REQUEST,
  payload: certData
});


export const signCertAction = id => ({
  type: ACTIONS.CRYPTO_OPERATION_SIGN_REQUEST,
  payload: {
    id
  }
});

export const createPKCS10RequestAction = params => ({
  type: ACTIONS.CRYPTO_CREATE_PKCS10_REQUEST,
  payload: params
});

export const resetFormCertAction = () => ({
  type: ACTIONS.CRYPTO_PRO_RESET_FORM
});


export const sortCertAction = dateValue => ({
  type: ACTIONS.CRYPTO_PRO_FILTERS_SORT,
  payload: {
    dateValue
  }
});

export const changeStatusAction = value => ({
  type: ACTIONS.CRYPTO_PRO_FILTERS_CHANGE_STATUS,
  payload: {
    value
  }
});

export const changeSortValueAction = value => ({
  type: ACTIONS.CRYPTO_PRO_FILTERS_CHANGE_SORT_VALUE,
  payload: {
    value
  }
});

export const clearStatusAction = () => ({
  type: ACTIONS.CRYPTO_PRO_FILTERS_CLEAR_STATUS
});
