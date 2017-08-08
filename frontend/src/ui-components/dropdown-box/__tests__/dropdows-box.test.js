/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Icon from 'ui-components/icon';
import DropdownBox from '../index';
import Popup from '../popup';
import Option from '../option';

describe('DropdownBox UI Component', () => {
  it('render', () => {
    const props = {
      options: [
        {
          value: 1,
          title: 'option 1',
          selected: true
        },
        {
          value: 2,
          title: 'option 2'
        },
        {
          value: 3,
          title: 'option 3'
        }
      ],
      onChange: jest.fn()
    };

    const wrapper = shallow(
      <DropdownBox
        {...props}
      />
    );
    expect(wrapper.find('.b-dropdown-box')).to.have.length(1);
    expect(wrapper.find('.b-dropdown-box__inner')).to.have.length(1);
    expect(wrapper.find('.b-dropdown-box__value')).to.have.length(1);
    expect(wrapper.find('.b-dropdown-box__icon')).to.have.length(1);
    expect(wrapper.find(Icon)).to.have.length(1);
    expect(wrapper.find(Popup)).to.have.length(0);
    expect(wrapper.find('.b-dropdown-box__options')).to.have.length(0);
    expect(wrapper.find(Option)).to.have.length(0);
    wrapper.unmount();
  });
});
