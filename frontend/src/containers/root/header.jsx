import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { history } from 'app/app-history'
import { connect } from 'react-redux'
import { selectors } from './selectors'
import {
  HeaderBlock,
  Logo,
  LogoImg,
  LogoName,
  MenuTop,
  MenuTopInner,
  LogoWord1,
  LogoWord2
} from './style.js'

function to (evt) {
  evt.preventDefault()
  const target = evt.currentTarget
  history.push(target.href)
}

const Header = ({menu}) => (
  <HeaderBlock>
    <Logo href='/' onClick={to}>
      <LogoImg src={require('images/bunker1.png')} alt='logo'/>
    </Logo>
    <MenuTop>
      <LogoName href='/'>
        <LogoWord1>BUNKER</LogoWord1>
        <LogoWord2>TATTOO STUDIO</LogoWord2>
      </LogoName>
      <MenuTopInner>
        {menu.map((menuItem, i) => (
          <a key={i} href={menuItem.get('url')} onClick={to}>
            {menuItem.get('title')}
          </a>
        ))}
      </MenuTopInner>
    </MenuTop>
  </HeaderBlock>
)

Header.propTypes = {
  menu: PropTypes.instanceOf(List).isRequired
}

export default connect(selectors)(Header)
