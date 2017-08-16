import { REDUCER_NAME } from './constants'

const authorsSelector = state => state.getIn(['users', 'userList'])
const authorsWithTattooSelector = state => state.getIn(['users', 'authorsWithTattoo'])

const tattooPhotosFromAuthorsSelector = state => state.getIn([REDUCER_NAME, 'tattooPhotosFromAuthors'])
const loaderPhotoSelector = state => state.getIn([REDUCER_NAME, 'loaderPhoto'])

const postListSelector = state => state.getIn(['post', 'postList'])
const loaderPostSelector = state => state.getIn(['post', 'loaderPost'])

const matchMediaSelector = state => state.get('matchMedia')

export const selectIndexContainer = state => ({
  authors: authorsSelector(state),
  tattooPhotosFromAuthors: tattooPhotosFromAuthorsSelector(state),
  authorsWithTattoo: authorsWithTattooSelector(state),
  matchMedia: matchMediaSelector(state),
  loaderPost: loaderPostSelector(state),
  loaderPhoto: loaderPhotoSelector(state),
  postList: postListSelector(state)
})
