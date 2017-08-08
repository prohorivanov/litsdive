/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DropdownBoxOption from '../option';

describe('DropdownBox UI Component / Option', () => {
  it('render', () => {
    const props = {
      children: 'option 1',
      index: 0,
      value: 1,
      active: false,
      selected: false,
      onClick: jest.fn(),
      onMouseEnter: jest.fn(),
      onMouseLeave: jest.fn()
    };

    const wrapper = shallow(
      <DropdownBoxOption
        {...props}
      />
    );
    expect(wrapper.find('.b-dropdown-box__option')).to.have.length(1);
    wrapper.unmount();
  });
});
