import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { history } from 'app/app-history'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import mapStateToProps from './selectors'
import MenuItem from './menu/menu-item'
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

function goToIndex (evt) {
  evt.preventDefault()
  history.push('/')
}

const Header = ({menu, push}) => (
  ReactDOM.createPortal(
    (
      <HeaderBlock>
        <Logo href='/' onClick={goToIndex}>
          <LogoImg src={require('images/bunker1.png')} alt='logo'/>
        </Logo>
        <MenuTop>
          <LogoName href={location.origin}>
            <LogoWord1>BUNKER</LogoWord1>
            <LogoWord2>TATTOO STUDIO</LogoWord2>
          </LogoName>
          <MenuTopInner>
            {menu.map((menuItem, i) => (
              <MenuItem key={i} {...menuItem.toJS()} push={push} />
            ))}
          </MenuTopInner>
        </MenuTop>
      </HeaderBlock>
    ),
    document.querySelector('#MAIN_HEADER')
  )
)

Header.propTypes = {
  menu: PropTypes.instanceOf(List).isRequired
}

export default connect(mapStateToProps, { push })(Header)
