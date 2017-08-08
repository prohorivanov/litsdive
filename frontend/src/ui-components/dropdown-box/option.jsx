import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const DropdownBoxOption = (props) => {
  const { children, index, value, active, selected, onClick, onMouseEnter, onMouseLeave } = props;

  const handleOnClick = (evt) => {
    onClick(evt, value);
  };

  const handleOnMouseEnter = () => {
    onMouseEnter(index);
  };

  const handleOnMouseLeave = () => {
    onMouseLeave();
  };

  const optionClassName = classnames('b-dropdown-box__option', {
    's-active'  : active,
    's-selected': selected
  });

  return (
    <div
      role="option"
      className={optionClassName}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClick}
    >
      {children}
    </div>
  );
};

DropdownBoxOption.propTypes = {
  children    : PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  index       : PropTypes.number.isRequired,
  value       : PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
  active      : PropTypes.bool,
  selected    : PropTypes.bool,
  onClick     : PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired
};

export default DropdownBoxOption;
