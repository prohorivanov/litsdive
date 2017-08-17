import { fromJS } from 'immutable'
import { ACTIONS } from './constants'

/**
 * собираем все фотографии из всех доступных галерей
 * @param listGallery
 */
const createPhotoCollection = listGallery => (
  listGallery
    .filter(author => author.get('images'))
    .reduce(
      (prev, current) => (
        prev.concat(current.get('images').slice(0, 3).map(i => i.merge({
          authorName: current.get('name'),
          authorId: current.get('author')
        })))
      ),
      fromJS([])
    )
)

export const normalizeNews = (state, payload) => (
  state.merge({
    newsList: payload,
    loaderNews: false
  })
)

const initialState = fromJS({
  newsList: [],
  postAbout: {},
  listPhoto: [],
  tattooPhotosFromAuthors: [],
  loaderNews: false,
  loaderPhoto: false
})

export default function indexContainerReducer (state = initialState, action) {
  switch (action.type) {
    case ACTIONS.INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_REQUEST:
      return state.set('loaderPhoto', true)
    case ACTIONS.INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_FAIL:
      return state.set('loaderPhoto', false)
    case ACTIONS.INDEX_CONTAINER_GET_ALL_PHOTOS_FROM_GALLERY_SUCCESS:
      return state
        .set('tattooPhotosFromAuthors', createPhotoCollection(fromJS(action.payload)))
        .set('loaderPhoto', false)
    case ACTIONS.INDEX_CONTAINER_GET_NEWS_SUCCESS:
      return normalizeNews(state, fromJS(action.payload))
    case ACTIONS.INDEX_CONTAINER_GET_NEWS_REQUEST:
      return state.set('loaderNews', true)
    case ACTIONS.INDEX_CONTAINER_GET_NEWS_FAIL:
      return state.set('loaderNews', false)
    case ACTIONS.INDEX_CONTAINER_GET_ABOUT_POST_SUCCESS:
      return state.set('postAbout', fromJS(action.payload))
    default:
      return state
  }
}
