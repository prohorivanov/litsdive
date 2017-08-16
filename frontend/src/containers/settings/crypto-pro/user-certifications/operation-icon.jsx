import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  IconOperations,
  Operations
} from './style.js';

const OperationsIcon = ({
                          isMouseEnter, operations, onDeleteCert, onRepeatCert, onSendToBankCert, onSignCertAction
}) => (
  <Operations isMouseEnter={isMouseEnter}>
    {operations.get('repeat') && (
      <IconOperations type="repeat" size="20" onClick={onRepeatCert} />
    )}

    {operations.get('remove') && (
      <IconOperations type="remove" size="20" onClick={onDeleteCert} />
    )}

    {operations.get('send') && (
      <IconOperations type="send" size="20" onClick={onSendToBankCert} />
    )}

    {operations.get('sign') && (
      <IconOperations type="sign" size="20" onClick={onSignCertAction} />
    )}
  </Operations>
);

OperationsIcon.propTypes = {
  isMouseEnter: PropTypes.bool,
  operations: ImmutablePropTypes.contains({
    repeat: PropTypes.bool,
    remove: PropTypes.bool,
    send: PropTypes.bool,
    sign: PropTypes.bool
  }),
  onDeleteCert: PropTypes.func,
  onRepeatCert: PropTypes.func,
  onSendToBankCert: PropTypes.func,
  onSignCertAction: PropTypes.func,
};

export default OperationsIcon;

