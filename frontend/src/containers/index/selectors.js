import { REDUCER_NAME } from './constants'

const authorsSelector = state => state.getIn(['users', 'userList'])
const tattooPhotosFromAuthorsSelector = state => state.getIn([REDUCER_NAME, 'tattooPhotosFromAuthors'])
const authorsWithTattooSelector = state => state.getIn(['users', 'authorsWithTattoo'])
const loaderNewsSelector = state => state.getIn(['news', 'loaderNews'])
const loaderPhotoSelector = state => state.getIn([REDUCER_NAME, 'loaderPhoto'])
const newsSelector = state => state.getIn(['news', 'newsList'])
const matchMediaSelector = state => state.get('matchMedia')

export const selectIndexContainer = state => ({
  authors: authorsSelector(state),
  tattooPhotosFromAuthors: tattooPhotosFromAuthorsSelector(state),
  authorsWithTattoo: authorsWithTattooSelector(state),
  matchMedia: matchMediaSelector(state),
  loaderNews: loaderNewsSelector(state),
  loaderPhoto: loaderPhotoSelector(state),
  news: newsSelector(state)
})
