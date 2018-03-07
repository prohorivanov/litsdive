import * as Pages from './dynamic-containers'
import NotFoundRouter from './views/no-router'

export const routes = [
  {
    exact: true,
    path: '/about',
    title: 'О нас',
    component: Pages.PageAbout
  },
  {
    exact: true,
    path: '/masters/:id',
    title: 'Мастера',
    component: Pages.PageMasters
  },
  {
    exact: true,
    path: '/masters',
    title: 'Мастера',
    component: Pages.PageMasters
  },
  {
    exact: true,
    path: '/catalogs/:id',
    title: 'Мастера',
    component: Pages.PageCatalog
  },
  {
    exact: true,
    path: '/catalogs/:id/?:tags',
    title: 'Мастера',
    component: Pages.PageCatalog
  },
  {
    exact: true,
    path: '/catalogs/?:tags',
    title: 'Мастера',
    component: Pages.PageCatalog
  },
  {
    exact: true,
    path: '/catalogs',
    title: 'Мастера',
    component: Pages.PageCatalog
  },
  {
    exact: true,
    path: '/contacts',
    title: 'Контакты',
    component: Pages.PageContacts
  },
  {
    exact: true,
    path: '/',
    component: Pages.PageIndex
  },
  {
    path: '*',
    component: NotFoundRouter
  }
]
