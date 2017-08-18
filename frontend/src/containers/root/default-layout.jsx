import React from 'react'
import PropTypes from 'prop-types'
import RootWrapperLayout from './index'
import styles from './style.less'

const DefaultWrapperLayout = props => (
  <RootWrapperLayout className={styles.DefaultLayout}>
    {props.children}
  </RootWrapperLayout>
)

DefaultWrapperLayout.propTypes = {
  children: PropTypes.element
}

export default DefaultWrapperLayout
