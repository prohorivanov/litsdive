import React from 'react';
import PropTypes from 'prop-types';
import { Map, List } from 'immutable';

import {
  Label,
  FlexRow,
  DropdownBoxExtend
} from './style.js';

export const FieldDropDown = (props) => {
  const {
    input,
    className,
    label,
    placeholderSelect,
    options,
    disabled,
    isOpenTop,
    optionRenderer,
    valueRenderer,
    tabIndex,
    warning,
    error,
    meta: {
      active
    }
  } = props;

  input.value = input.value && Map.isMap(input.value) ? input.value.toJS() : input.value;
  const optionsSelect = options && List.isList(options) ? options.toJS() : options;

  function onChange(evt, value) {
    value.preventDefault = () => {};// eslint-disable-line no-param-reassign
    props.input.onChange(value.toJS());
  }

  return (
    <FlexRow
      dropUp={isOpenTop}
      data-loc={input.name}
      className={className}
      empty={!optionsSelect || !optionsSelect.length}
    >
      {label &&
      <Label error={(error || warning) && active}>
        {label}
      </Label>
      }
      <DropdownBoxExtend
        isGetFullValue
        tabIndex={tabIndex}
        maxHeight={350}
        value={input.value}
        isFocused={active}
        isDisabled={disabled}
        options={optionsSelect}
        optionRenderer={optionRenderer}
        valueRenderer={valueRenderer}
        placeholder={placeholderSelect || ''}
        isError={error}
        isWarning={warning && !error}
        {...input}
        onChange={onChange}
      />
    </FlexRow>
  );
};


FieldDropDown.defaultProps = {
  autoBlur   : true,
  openOnFocus: true,
  isLoading  : false,
  disabled   : false,
};

FieldDropDown.propTypes = {
  input            : PropTypes.object,
  label            : PropTypes.string,
  optionRenderer   : PropTypes.func,
  valueRenderer    : PropTypes.func,
  placeholderSelect: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  className        : PropTypes.string,
  isOpenTop        : PropTypes.bool,
  disabled         : PropTypes.bool,
  options          : PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  warning: PropTypes.bool,
  error: PropTypes.bool,
  meta             : PropTypes.shape({
    active: PropTypes.bool
  }),
  tabIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};
