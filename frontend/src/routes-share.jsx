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
      getComponent(location, cb) {
        const importModules = Promise.all([
          import('./containers/index/reducer'),
          import('./containers/index')
        ])

        const renderRoute = loadRoute(cb)
        importModules
          .then(([reducer, component]) => {
            injectAsyncReducer(store, 'indexContainerReducer', reducer.default)
            renderRoute(component)
          })
          .catch(errorLoading)
      }
    },
    childRoutes: [
      {
        path: 'about(/)',
        title: 'О нас',
        getComponent(location, cb) {
          const importModules = Promise.all([
            import('./containers/about/reducer'),
            import('./containers/about')
          ])
          const renderRoute = loadRoute(cb)
          importModules
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'aboutContainerReducer', reducer.default)
              renderRoute(component)
            })
            .catch(errorLoading)
        }
      },
      {
        path: 'masters(/)(:id)',
        title: 'Мастера',
        getComponent(location, cb) {
          const renderRoute = loadRoute(cb)
          Promise
            .all([
              import('./containers/masters/reducer'),
              import('./containers/masters')
            ])
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'mastersContainerReducer', reducer.default)
              renderRoute(component)
            })
            .catch(errorLoading)
        }
      },
      {
        path: 'products(/)',
        title: 'Товары',
        getComponent(location, cb) {
          const renderRoute = loadRoute(cb)
          Promise
            .all([
              import('./containers/products/reducer'),
              import('./containers/products')
            ])
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'productsContainerReducer', reducer.default)
              renderRoute(component)
            })
            .catch(errorLoading)
        }
      },
      {
        path: 'contacts(/)',
        title: 'Контакты',
        getComponent(location, cb) {
          const renderRoute = loadRoute(cb)
          Promise
            .all([
              import('./containers/contacts/reducer'),
              import('./containers/contacts')
            ])
            .then(([reducer, component]) => {
              injectAsyncReducer(store, 'contactsContainerReducer', reducer.default)
              renderRoute(component)
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
