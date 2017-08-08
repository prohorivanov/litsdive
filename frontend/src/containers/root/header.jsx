import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  HeaderBlock,
  Logo,
  LogoImg,
  LogoName,
  MenuTop,
  MenuTopInner,
  LogoWord1,
  LogoWord2
} from './style.js';

const Header = ({ menu }) =>  (
  <HeaderBlock>
    <Logo href="/">
      <LogoImg src={require('images/bunker1.png')} alt="logo" />
    </Logo>
    <MenuTop>
      <LogoName>
        <LogoWord1>BUNKER</LogoWord1>
        <LogoWord2>TATTOO STUDIO</LogoWord2>
      </LogoName>
      <MenuTopInner>
        {menu.map((menuItem, i) => (
          <Link key={i} to={menuItem.url}>
            {menuItem.title}
          </Link>
        ))}
      </MenuTopInner>
    </MenuTop>
  </HeaderBlock>
);

Header.propTypes = {
  menu: PropTypes.array.isRequired
};

export default Header;
