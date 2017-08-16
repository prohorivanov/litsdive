import { REDUCER_NAME } from './constants'

const gallerySelector = state => state.getIn([REDUCER_NAME, 'gallery'])
const loaderSelector = state => state.getIn([REDUCER_NAME, 'loader'])

export const selectIndexContainer = state => ({
  gallery: gallerySelector(state),
  loader: loaderSelector(state)
})
