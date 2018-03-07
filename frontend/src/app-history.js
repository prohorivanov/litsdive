import { createBrowserHistory } from 'history'
import qhistory from 'qhistory'
import { stringify, parse } from 'qs'

export const history = qhistory(
  createBrowserHistory(),
  stringify,
  parse
)
