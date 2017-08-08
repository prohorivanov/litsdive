import React from 'react';
import PropTypes from 'prop-types';
import {
  FlexRow,
  CollLabel,
  CollDescription,
} from './style';


export const FieldText = ({ input, label }) => (
  <FlexRow>
    <CollLabel>{label}</CollLabel>
    <CollDescription>{input.value}</CollDescription>
  </FlexRow>
);

FieldText.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object
};

