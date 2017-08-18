import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as ProfileAction from 'dal/profile/actions'
import RootWrapperLayout from './index'
import { selectors } from './selectors'
import { ContentWrapper, IndexLayout } from './style.js'

const IndexWrapperLayout = props => (
  <RootWrapperLayout>
    <IndexLayout>
      <ContentWrapper>
        {cloneElement(props.children, {props})}
      </ContentWrapper>
    </IndexLayout>
  </RootWrapperLayout>
)

IndexWrapperLayout.propTypes = {
  children: PropTypes.element.isRequired
}

export default connect(selectors,
  {
    ...ProfileAction
  }
)(IndexWrapperLayout)
