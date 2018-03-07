import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Map } from 'immutable'
import { trackPage } from 'app/google-analytics-util'
import {
  LayoutBlock,
  MainColl,
  PostAboutBlock
} from './style.js'

export class Layout extends Component {
  static propTypes = {
    authors: PropTypes.instanceOf(List).isRequired,
    postAbout: PropTypes.instanceOf(Map).isRequired,
    // loaderPost: PropTypes.bool,
    postList: PropTypes.instanceOf(List).isRequired,
    getPhotosFromGalleriesAction: PropTypes.func.isRequired,
    getPostListAction: PropTypes.func.isRequired,
    getAboutPostAction: PropTypes.func.isRequired
  }

  state = {
    showSettings: false
  }

  componentDidMount () {
    const {
      authors,
      postList,
      getPhotosFromGalleriesAction,
      getPostListAction,
      getAboutPostAction
    } = this.props
    if (!authors.size) {
      getPhotosFromGalleriesAction()
    }
    if (!postList.size) {
      getPostListAction()
    }
    getAboutPostAction()
    trackPage('/index')
  }

  render () {
    const {postAbout} = this.props
    return (
      <LayoutBlock>
        <MainColl>
          {/* loaderPhoto && <Loader centered/> */}
          <PostAboutBlock>
            <div dangerouslySetInnerHTML={{__html: postAbout.getIn(['content', 'extended'])}}/>
          </PostAboutBlock>
        </MainColl>
      </LayoutBlock>
    )
  }
}

export default Layout
