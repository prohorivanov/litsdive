import { combineReducers }  from 'redux-immutable';
import {
  CRYPTO_PRO_REDUCER,
  SETTINGS_REDUCER
} from './constants';

import cryptoProSettingsReducer from './crypto-pro/reducer';
import settingsReducer from './reducer';

export default combineReducers({
  [CRYPTO_PRO_REDUCER]: cryptoProSettingsReducer,
  [SETTINGS_REDUCER]: settingsReducer,
});
