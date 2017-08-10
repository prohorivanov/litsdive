import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import Loader from 'ui-components/loader'
import * as masterAction from 'dal/users/actions'
import * as postAction from 'dal/post/actions'
import * as LocalAction from './actions'
import { selectIndexContainer } from './selectors'
import Gallery from './gallery'
import { Layout, MainColl } from './style.js'

export class IndexLayout extends Component {
  static propTypes = {
    loaderPhoto: PropTypes.bool,
    authors: PropTypes.instanceOf(List).isRequired,
    // loaderPost: PropTypes.bool,
    postList: PropTypes.instanceOf(List).isRequired,
    tattooPhotosFromAuthors: PropTypes.instanceOf(List).isRequired,
    getPhotosFromGalleriesAction: PropTypes.func.isRequired,
    getPostListAction: PropTypes.func.isRequired
  }

  state = {
    showSettings: false
  }

  componentDidMount () {
    const {
      authors,
      postList,
      getPhotosFromGalleriesAction,
      getPostListAction
    } = this.props
    if (!authors.size) {
      getPhotosFromGalleriesAction()
    }
    if (!postList.size) {
      getPostListAction()
    }
  }

  render () {
    const {tattooPhotosFromAuthors, loaderPhoto} = this.props
    return (
      <Layout>
        <MainColl>
          {loaderPhoto && <Loader centered/>}
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
