import { axiosConfig } from 'config/application/axios'
import * as authentication from './authentication'
import * as authors from './authors'
import * as products from './products'
import * as user from './user'
import * as post from './post'
import * as contacts from './contacts'
import * as gallery from './gallery'

const packages = {
  authors,
  products,
  authentication,
  user,
  post,
  contacts,
  gallery
}

function axios () {
  return axiosConfig.getAxiosInstance()
}

function createRequest (request) {
  return function (params) {
    const config = request(params)
    const instanceAxios = axios()
    return instanceAxios(config)
  }
}

function createMethods (reqRespObj) {
  const methods = {}
  Object.keys(reqRespObj).forEach((methodName) => {
    methods[methodName] = createRequest(reqRespObj[methodName])
  })
  return methods
}

function wrapAllByCreateMethods (obj) {
  const ret = {}
  Object.keys(obj).forEach((packageName) => {
    ret[packageName] = createMethods(obj[packageName])
  })
  return ret
}

const methodsForBackendCall = wrapAllByCreateMethods(packages)

export default methodsForBackendCall
