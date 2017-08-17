import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import Loader from 'ui-components/loader'
import * as masterAction from 'dal/users/actions'
import * as postAction from 'dal/post/actions'
import * as LocalAction from './actions'
import { selectIndexContainer } from './selectors'
import Gallery from './gallery'
import { Layout, MainColl, PostAboutBlock } from './style.js'

export class IndexLayout extends Component {
  static propTypes = {
    loaderPhoto: PropTypes.bool,
    authors: PropTypes.instanceOf(List).isRequired,
    postAbout: PropTypes.instanceOf(Map).isRequired,
    // loaderPost: PropTypes.bool,
    postList: PropTypes.instanceOf(List).isRequired,
    tattooPhotosFromAuthors: PropTypes.instanceOf(List).isRequired,
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
  }

  render () {
    const {tattooPhotosFromAuthors, loaderPhoto, postAbout} = this.props
    console.log(postAbout.toJS(), 'postAbout')

    return (
      <Layout>
        <MainColl>
          {loaderPhoto && <Loader centered/>}
          <PostAboutBlock>
            <div dangerouslySetInnerHTML={{__html: postAbout.getIn(['content', 'extended'])}}/>
          </PostAboutBlock>
          {!tattooPhotosFromAuthors.size ? null : (
            <Gallery tattooPhotosFromAuthors={tattooPhotosFromAuthors}/>
          )}
        </MainColl>
      </Layout>
    )
  }
}

export default connect(
  selectIndexContainer,
  {
    ...masterAction,
    ...postAction,
    ...LocalAction
  }
)(IndexLayout)
