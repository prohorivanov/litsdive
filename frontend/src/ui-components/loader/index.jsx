import React from 'react';
import PropTypes from 'prop-types';
import {
  LoaderBlock,
  LoaderMini,
  LoaderTiny,
  LoaderSmall,
  LoaderLarge,
  LoaderBig,
  LoaderInline,
} from './style.js';


const Loader = ({ centered, size = 'medium', inline, ...rest }) => {
  if (inline) {
    return <LoaderInline {...rest} className={centered ? 'centered' : ''} />;
  }

  switch (size) {
    case 'mini':
      return <LoaderMini {...rest} />;
    case 'tiny':
      return <LoaderTiny {...rest} />;
    case 'small':
      return <LoaderSmall {...rest} />;
    case 'large':
      return <LoaderLarge {...rest} />;
    case 'big':
      return <LoaderBig {...rest} />;
    default:
      return <LoaderBlock size={size} {...rest}  />;
  }
};

Loader.propTypes = {
  children : PropTypes.string,
  className: PropTypes.string,
  size     : PropTypes.oneOf([
    'mini',
    'tiny',
    'small',
    'medium',
    'large',
    'big'
  ]),
  inline   : PropTypes.bool,
  centered : PropTypes.bool,
};

export default Loader;