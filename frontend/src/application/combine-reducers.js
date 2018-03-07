import { combineReducers } from 'redux-immutable'
import { reducer as form } from 'redux-form/immutable'
import rootReducer from 'dal/root/reducer'
import profile from 'dal/profile/reducer'
import matchMedia from 'dal/match-media/reducer'
import contacts from 'dal/contacts/reducer'
import users from 'dal/users/reducer'
import post from 'dal/post/reducer'
import {
  routing,
  application
} from './reducer'

/**
 *
 * @param injectedReducers
 * @returns {Function}
 */
export default function createReducer (injectedReducers) {
  return combineReducers({
    form,
    application,
    routing,
    rootReducer,
    contacts,
    profile,
    matchMedia,
    users,
    post,
    ...injectedReducers
  })
}
