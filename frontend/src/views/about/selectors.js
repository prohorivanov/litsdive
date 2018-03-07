import { LOCAL_REDUCER } from './constants'

const gallerySelector = state => state.getIn([LOCAL_REDUCER, 'gallery'])
const loaderSelector = state => state.getIn([LOCAL_REDUCER, 'loader'])

const mapStateToProps = state => ({
  gallery: gallerySelector(state),
  loader: loaderSelector(state)
})

export default mapStateToProps
