import { fromJS } from 'immutable'
import { ACTIONS } from './constants'

export const initialState = fromJS({
  globalLoaderShow: false,
  menu: [
    {
      url: '/about',
      title: 'О нас'
    },
    {
      url: '/masters',
      title: 'Мастера'
    },
    {
      url: '/products',
      title: 'Товары'
    },
    {
      url: '/contacts',
      title: 'Контакты'
    }
  ]
})

export default function rootReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.ROOT_CONTAINER_TOGGLE_LOADER:
      return state.set('globalLoaderShow', action.payload.show)
    default:
      return state
  }
}
