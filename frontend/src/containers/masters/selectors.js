import { createSelector } from 'reselect'
import { fromJS } from 'immutable'
import { REDUCER_NAME } from './constants'

const userListSelector = state => state.getIn(['users', 'userList'])
const userLoaderSelector = state => state.getIn(['users', 'loader'])
const loaderDetailSelector = state => state.getIn([REDUCER_NAME, 'loader'])
const galleryDetailSelector = state => state.getIn([REDUCER_NAME, 'galleryDetail'])
const galleriesListSelector = state => state.getIn([REDUCER_NAME, 'galleriesList'])

/**
 * мержим данные галерей и их пользователей
 */
export const galleriesWithAuthorSelector = createSelector(
  userListSelector,
  galleriesListSelector,
  (userList, galleriesList) => (
    userList.size ? galleriesList.map(g => {
      const user = userList.find(u => u.get('_id') === g.get('author'))
      return g.set('author', user)
    }) : fromJS([])
  )
)

export const prepareUserListForReactSelect = createSelector(
  userListSelector,
  userList => userList.map(u =>
    u
      .set('value', u.get('_id'))
      .set('label', u.get('fullName'))
  )
)

export const findActiveUserSelector = createSelector(
  prepareUserListForReactSelect,
  galleryDetailSelector,
  (userList, galleryDetail) => {
    if (galleryDetail.size) {
      const id = galleryDetail.getIn(['author', '_id'])
      const activeUser = userList.find(u => u.get('_id') === id)
      return activeUser.toJS()
    }
    return null
  }
)

export const selectIndexContainer = state => ({
  userList: prepareUserListForReactSelect(state),
  loaderDetail: loaderDetailSelector(state),
  userLoader: userLoaderSelector(state),
  galleryDetail: galleryDetailSelector(state),
  activeUser: findActiveUserSelector(state),
  galleriesList: galleriesListSelector(state),
  galleriesWithAuthor: galleriesWithAuthorSelector(state)
})
