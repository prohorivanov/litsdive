import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List } from 'immutable'
import Loader from 'ui-components/loader'
import ImmutablePropTypes from 'react-immutable-proptypes'
import * as LocalAction from './actions'
import { selectIndexContainer } from './selectors'
import {
  CategoryTitle,
  Layout,
  MainColl
} from './style.js'

export class ProductsLayout extends React.Component {

  static propTypes = {
    loader: PropTypes.bool,
    productsList: PropTypes.instanceOf(List).isRequired,
    getProductsAction: PropTypes.func.isRequired
  }

  componentDidMount () {
    const {getProductsAction} = this.props
    getProductsAction()
  }

  render () {
    const {productsList, loader} = this.props

    return (
      <Layout>
        <MainColl>
          {loader && <Loader centered/>}
          {productsList.map(category => (
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
