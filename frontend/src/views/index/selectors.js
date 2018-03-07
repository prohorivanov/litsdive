import { LOCAL_REDUCER } from './constants'

const authorsSelector = state => state.getIn(['users', 'userList'])
const authorsWithTattooSelector = state => state.getIn(['users', 'authorsWithTattoo'])

const tattooPhotosFromAuthorsSelector = state => state.getIn([LOCAL_REDUCER, 'tattooPhotosFromAuthors'])
const loaderPhotoSelector = state => state.getIn([LOCAL_REDUCER, 'loaderPhoto'])
const postAboutSelector = state => state.getIn([LOCAL_REDUCER, 'postAbout'])

const postListSelector = state => state.getIn(['post', 'postList'])
const loaderPostSelector = state => state.getIn(['post', 'loaderPost'])

const matchMediaSelector = state => state.get('matchMedia')

const mapStateToProps = state => ({
  authors: authorsSelector(state),
  tattooPhotosFromAuthors: tattooPhotosFromAuthorsSelector(state),
  authorsWithTattoo: authorsWithTattooSelector(state),
  matchMedia: matchMediaSelector(state),
  loaderPost: loaderPostSelector(state),
  loaderPhoto: loaderPhotoSelector(state),
  postList: postListSelector(state),
  postAbout: postAboutSelector(state)
})

export default mapStateToProps
