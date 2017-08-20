import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Loader from 'ui-components/loader'
import * as LocalAction from './actions'
import { selectIndexContainer } from './selectors'
import { trackPage } from 'app/google-analytics-util'
import Gallery from './gallery'
import { Layout, MainColl } from './style.js'

export class AboutLayout extends Component {
  static propTypes = {
    loader: PropTypes.bool,
    gallery: PropTypes.instanceOf(Map).isRequired,
    getGalleryAction: PropTypes.func.isRequired
  }

  state = {
    showSettings: false
  }

  componentDidMount () {
    const {
      gallery,
      getGalleryAction
    } = this.props
    if (!gallery.size) {
      getGalleryAction()
    }

    trackPage('/about')
  }

  render () {
    const {gallery, loader} = this.props
    return (
      <Layout>
        <MainColl>
          {loader && <Loader centered/>}
          {!gallery.size ? null : (
            <Gallery gallery={gallery}/>
          )}
        </MainColl>
      </Layout>
    )
  }
}

export default connect(
  selectIndexContainer,
  {
    ...LocalAction
  }
)(AboutLayout)
