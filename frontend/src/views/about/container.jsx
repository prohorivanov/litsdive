import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { trackPage } from 'app/google-analytics-util'
import Gallery from './gallery'
import { LayoutBlock, MainColl } from './style.js'

export class Layout extends Component {
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
      <LayoutBlock>
        <MainColl>
          {/* loader && <Loader centered/> */}
          {!gallery.size ? null : (
            <Gallery gallery={gallery}/>
          )}
        </MainColl>
      </LayoutBlock>
    )
  }
}

export default Layout
