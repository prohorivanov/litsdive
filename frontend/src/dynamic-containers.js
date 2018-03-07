import asyncComponent from './application/async-bundle'

function errorLoading (error) {
  console.warn(`Dynamic page loading failed: ${error}`) // eslint-disable-line no-console
}

const loadRoute = mod => mod.default

export const PageIndex = asyncComponent(() => (
  import('./views/index').then(component => loadRoute(component))
))

export const PageAbout = asyncComponent(() => (
  import('./views/about')
    .then(component => loadRoute(component))
    .catch(errorLoading)
))

export const PageMasters = asyncComponent(() => (
  import('./views/masters')
    .then(component => loadRoute(component))
    .catch(errorLoading)
))

export const PageCatalog = asyncComponent(() => (
  import('./views/catalog')
    .then(component => loadRoute(component))
    .catch(errorLoading)
))

export const PageContacts = asyncComponent(() => (
  import('./views/contacts')
    .then(component => loadRoute(component))
    .catch(errorLoading)
))
