import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { connect } from 'react-redux'
import { selectors } from './selectors'
import MenuItem from './menu/menu-item'
import {
  FooterBlock
} from './style.js'

const Footer = ({menu}) => (
  <FooterBlock>
    {menu.map((menuItem, i) => (
      <MenuItem key={i} {...menuItem.toJS()} />
    ))}
  </FooterBlock>
)

Footer.propTypes = {
  menu: PropTypes.instanceOf(List).isRequired
}
export default connect(selectors)(Footer)
