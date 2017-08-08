import React from 'react';
import PropTypes from 'prop-types';


export default function HeaderModal(props = {}) {
  return (
    <div className="b-ui-modal__header">
      <div className="b-ui-modal__header-title">
        {props.children}
      </div>
    </div>
  );
}

HeaderModal.propTypes = {
  children: PropTypes.node
};
