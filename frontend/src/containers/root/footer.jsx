import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import {
  FooterBlock,
} from './style.js';

const Footer = ({ menu }) =>  (
  <FooterBlock>
    {menu.map((menuItem, i) => (
      <Link key={i} to={menuItem.url}>
        {menuItem.title}
      </Link>
    ))}
  </FooterBlock>
);

Footer.propTypes = {
  menu: PropTypes.array.isRequired
};

export default Footer;
