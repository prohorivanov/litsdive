import axios from 'axios';
import Qs from 'qs';
import serviceUrl from './service-url';

/**
 * Нормализует Query параметры передаваемые в axios.request
 * @return params - нормализованные query параметры
 */
function normalizeQueryParams(params) {
  if (params.query && typeof params.query === 'object') {
    return { ...params, query: JSON.stringify(params.query) };
  }
  return params;
}

const axiosInstance = axios.create({
  validateStatus: status => (status >= 200 && status < 400),

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // qs.stringify({ a: ['b', 'c'] }, { arrayFormat: 'repeat' }) -> 'a=b&a=c'
  paramsSerializer(params) {
    const paramsNormalize = Qs.stringify(normalizeQueryParams(params), { arrayFormat: 'repeat' });
    return paramsNormalize;
  }
});


export const axiosConfig = {

  /**
   * @param {Object} headers
   */
  setDefaultHeaders(headers) {
    axiosInstance.defaults.headers.common = { ...headers };
  },

  getAxiosInstance() {
    return axiosInstance;
  },

  init() {
    axiosInstance.defaults.baseURL = serviceUrl.SERVICE_BASE_URL;
  }
};
