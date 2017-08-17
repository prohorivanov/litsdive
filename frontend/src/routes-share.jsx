import React from 'react'
import { Router } from 'react-router'
import NotFoundRouter from './containers/no-router'
import IndexWrapperLayoutTemplate from './containers/root/index-layout'
import store, { injectAsyncReducer } from './store'

function errorLoading (error) {
  console.warn(`Dynamic page loading failed: ${error}`) // eslint-disable-line no-console
}

function loadRoute (cb) {
  return module => cb(null, module.default)
}

const routes = [
  {
    path: '/',
    component: IndexWrapperLayoutTemplate,
    indexRoute: {
      getComponent(_, cb) {
        Promise
          .all([
            import('./containers/index/reducer'),
            import('./containers/index')
          ])
          .then(([reducer, component]) => {
            injectAsyncReducer(store, 'indexContainerReducer', reducer.default)
            loadRoute(cb)(component)
          })
          .catch(errorLoading)
      }
    },
    childRoutes: [
      {
        path: 'about(/)',
        title: 'О нас',
        getComponent(_, cb) {
          Promise
            .all([
              import('./containers/about/reducer'),
              import('./containers/about')
            ])
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'aboutContainerReducer', reducer.default)
              loadRoute(cb)(component)
            })
            .catch(errorLoading)
        }
      },
      {
        path: 'masters(/)(:id)',
        title: 'Мастера',
        getComponent(_, cb) {
          Promise
            .all([
              import('./containers/masters/reducer'),
              import('./containers/masters')
            ])
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'mastersContainerReducer', reducer.default)
              loadRoute(cb)(component)
            })
            .catch(errorLoading)
        }
      },
      {
        path: 'products(/)',
        title: 'Товары',
        getComponent(_, cb) {
          Promise
            .all([
              import('./containers/products/reducer'),
              import('./containers/products')
            ])
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'productsContainerReducer', reducer.default)
              loadRoute(cb)(component)
            })
            .catch(errorLoading)
        }
      },
      {
        path: 'contacts(/)',
        title: 'Контакты',
        getComponent(_, cb) {
          Promise
            .all([
              import('./containers/contacts/reducer'),
              import('./containers/contacts')
            ])
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'contactsContainerReducer', reducer.default)
              loadRoute(cb)(component)
            })
            .catch(errorLoading)
        }
      },
      {
        path: '*',
        component: NotFoundRouter
      }
    ]
  }
]

export default history => (
  <Router history={history} routes={routes}/>
)
