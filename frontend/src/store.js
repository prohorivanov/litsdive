import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { axiosConfig }      from 'config/application/axios';
import thunkMiddleware      from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { combineReducers }  from 'redux-immutable';
import { routerMiddleware } from 'react-router-redux';
import dalReducers          from 'dal';
import rootSagas             from 'sagas';
import { history }          from './app-history';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  thunkMiddleware,
  routerMiddleware(history),
  sagaMiddleware
];

const reducers = [];

if (process.env.NODE_ENV !== 'production') { // eslint-disable-line no-undef
  const { persistState } = require('redux-devtools'); // eslint-disable-line global-require
  const debugSession = window.location.href.match(/[?&]debug_session=([^&]+)\b/);

  reducers.push(
    persistState(debugSession)
  );

  const logger = require('redux-logger')({ // eslint-disable-line global-require
    level           : 'info',
    collapsed       : true,
    stateTransformer: state => state && state.toJS()
  });

  middlewares.push(logger);

  if (window.devToolsExtension) {
    reducers.push(window.devToolsExtension());
  }
}

const finalCreateStore = compose(applyMiddleware(...middlewares), ...reducers)(createStore);
const configuredStore = finalCreateStore(combineReducers(dalReducers));

// Extensions
configuredStore.runSaga = sagaMiddleware.run;
configuredStore.asyncReducers = {}; // Async reducer registry
configuredStore.asyncSagas = {};
configuredStore.runSaga(rootSagas);

export default configuredStore;

/**
 * code splitting in Redux
 *
 * @param store
 * @param name
 * @param asyncReducer
 */
export function injectAsyncReducer(store, name, asyncReducer) {
  if (store.asyncReducers[name]) return;
  store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
  store.replaceReducer(combineReducers({ ...dalReducers, ...store.asyncReducers }));
}
