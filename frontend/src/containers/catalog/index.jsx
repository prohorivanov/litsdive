import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import Loader from 'ui-components/loader'
import Gallery from './gallery'
import * as LocalAction from './actions'
import { trackPage } from 'app/google-analytics-util'
import { selectIndexContainer } from './selectors'
import {
  Layout,
  MainColl,
  SelectExtended,
  WrapperGallery
} from './style.js'

export class ProductsLayout extends Component {
  static propTypes = {
    loader: PropTypes.bool,
    catalogList: PropTypes.instanceOf(List).isRequired,
    tagsList: PropTypes.instanceOf(List).isRequired,
    getCatalogsAction: PropTypes.func.isRequired,
    getCatalogsByTagsAction: PropTypes.func.isRequired,
    getCatalogTagsAction: PropTypes.func.isRequired
  }

  state = {
    tagsChoose: []
  }

  componentDidMount () {
    const {getCatalogsAction, getCatalogTagsAction} = this.props
    getCatalogsAction()
    getCatalogTagsAction()
    trackPage('/products')
  }

  onChangeTag = (value) => {
    const {getCatalogsByTagsAction, getCatalogsAction} = this.props
    this.setState({tagsChoose: value})
    if (value && value.length) {
      getCatalogsByTagsAction(value)
    } else {
      getCatalogsAction()
    }
  }

  render () {
    const {catalogList, tagsList, loader} = this.props
    const {tagsChoose} = this.state
    return (
      <Layout>
        <MainColl>
          <SelectExtended
            multi
            value={tagsChoose}
            options={tagsList.toJS()}
            onChange={this.onChangeTag}
            noResultsText=''
            placeholder='фильтр по тегам'
          />
          <WrapperGallery>
            {loader && <Loader centered/>}
            {!catalogList.size ? null : (
              <Gallery products={catalogList}/>
            )}
          </WrapperGallery>
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
)(ProductsLayout)
