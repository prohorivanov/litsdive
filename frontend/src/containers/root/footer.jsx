import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { history } from 'app/app-history'
import { connect } from 'react-redux'
import { selectors } from './selectors'
import {
  FooterBlock
} from './style.js'

function to (evt) {
  evt.preventDefault()
  const target = evt.target
  history.push(target.href)
}

const Footer = ({menu}) => (
  <FooterBlock>
    {menu.map((menuItem, i) => (
      <a key={i} href={menuItem.get('url')} onClick={to}>
        {menuItem.get('title')}
      </a>
    ))}
  </FooterBlock>
)

Footer.propTypes = {
  menu: PropTypes.instanceOf(List).isRequired
}
export default connect(selectors)(Footer)
