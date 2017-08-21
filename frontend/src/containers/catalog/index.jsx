import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import Loader from 'ui-components/loader'
import ImmutablePropTypes from 'react-immutable-proptypes'
import * as LocalAction from './actions'
import { trackPage } from 'app/google-analytics-util'
import { selectIndexContainer } from './selectors'
import {
  CategoryTitle,
  Layout,
  MainColl,
  SelectExtended
} from './style.js'

export class ProductsLayout extends Component {
  static propTypes = {
    loader: PropTypes.bool,
    catalogList: PropTypes.instanceOf(List).isRequired,
    tagsList: PropTypes.instanceOf(List).isRequired,
    getCatalogsAction: PropTypes.func.isRequired,
    getCatalogsByTagsAction: PropTypes.func.isRequired,
    getCatalogBySlugAction: PropTypes.func.isRequired,
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
    console.log(value[0].name, '// eslint-disable-line no-console'); // eslint-disable-line no-console
    const {getCatalogsByTagsAction} = this.props
    this.setState({tagsChoose: value})
    getCatalogsByTagsAction(value)
  }

  onChooseProduct = (item) => {
    const {getCatalogBySlugAction} = this.props
    getCatalogBySlugAction(item.get('slug'))
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
          />
          {loader && <Loader centered/>}
          {catalogList.map(category => (
            <CategoryItem
              category={category}
              key={category.get('uuid')}/>
          ))}
        </MainColl>
      </Layout>
    )
  }
}

const CategoryItem = ({category}) => (
  <CategoryTitle>{category.get('title')}</CategoryTitle>
)

CategoryItem.propTypes = {
  category: ImmutablePropTypes.contains({
    title: PropTypes.string,
    uuid: PropTypes.string
  }).isRequired
}

export default connect(
  selectIndexContainer,
  {
    ...LocalAction
  }
)(ProductsLayout)
