import React from 'react';
import PropTypes from 'prop-types';
import {
  Label,
  FlexRow,
  ErrorsWarning
} from './style';

import { Input } from '../style';

/**
 *
 * @param input
 * @param type
 * @param placeholder
 * @param meta
 * @param label
 * @returns {XML}
 * @constructor
 */
export const FieldInput = ({ input, type, placeholder, meta, label, autoFocus }) => {
  const { touched, warning, invalid, error } = meta;
  return (
    <FlexRow>
      {label && (
        <Label>{label}</Label>
      )}
      <Input
        {...input}
        autoFocus={autoFocus}
        type={type}
        placeholder={placeholder}
        error={invalid && error}
      />

      {touched && (
        (warning && <ErrorsWarning>{warning}</ErrorsWarning>)
      )}
    </FlexRow>
  );
};

FieldInput.propTypes = {
  autoFocus: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ]),
    warning: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string
    ])
  }),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  input: PropTypes.object,
  type: PropTypes.string
};

