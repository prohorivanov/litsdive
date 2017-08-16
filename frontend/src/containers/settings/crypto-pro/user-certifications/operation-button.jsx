import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import {
  ButtonOperation,
  OperationsButtonContainer
} from './style.js';

const OperationsButton = ({ operations, onDeleteCert, onRepeatCert, onSendToBankCert, onSignCertAction }) => (
  <OperationsButtonContainer>
    {operations.get('repeat') && (
      <ButtonOperation primary size="large" onClick={onRepeatCert}>Повторить</ButtonOperation>
    )}

    {operations.get('send') && (
      <ButtonOperation primary size="large" onClick={onSendToBankCert}>Отправить в банк</ButtonOperation>
    )}

    {operations.get('sign') && (
      <ButtonOperation primary size="large" onClick={onSignCertAction}>Подписать</ButtonOperation>
    )}

    {operations.get('remove') && (
      <ButtonOperation size="large" onClick={onDeleteCert}>Удалить</ButtonOperation>
    )}
  </OperationsButtonContainer>
);

OperationsButton.propTypes = {
  operations: ImmutablePropTypes.contains({
    repeat: PropTypes.bool,
    remove: PropTypes.bool,
    send: PropTypes.bool,
    sign: PropTypes.bool
  }),
  onDeleteCert: PropTypes.func,
  onRepeatCert: PropTypes.func,
  onSendToBankCert: PropTypes.func,
  onSignCertAction: PropTypes.func
};

export default OperationsButton;

