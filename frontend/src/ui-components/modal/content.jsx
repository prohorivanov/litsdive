import React from 'react';
import PropTypes from 'prop-types';

export default function ContentModal(props = {}) {
  return (
    <div className="b-ui-modal__content">
      {props.children}
    </div>
  );
}

ContentModal.propTypes = {
  children: PropTypes.node
};
