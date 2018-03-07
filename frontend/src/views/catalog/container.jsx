import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import Gallery from './gallery'
import { trackPage } from 'app/google-analytics-util'
import {
  LayoutBlock,
  MainColl,
  SelectExtended,
  WrapperGallery
} from './style.js'

export class Layout extends Component {
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
      <LayoutBlock>
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
            {/* loader && <Loader centered/> */}
            {!catalogList.size ? null : (
              <Gallery products={catalogList}/>
            )}
          </WrapperGallery>
        </MainColl>
      </LayoutBlock>
    )
  }
}

export default Layout
