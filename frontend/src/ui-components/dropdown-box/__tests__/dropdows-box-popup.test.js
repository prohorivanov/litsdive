/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import DropdownBoxPopup from '../popup';

describe('DropdownBox UI Component / Popup', () => {
  it('render', () => {
    const props = {
      openerElement: {},
      onPrev: jest.fn(),
      onNext: jest.fn(),
      onEnter: jest.fn(),
      onClose: jest.fn()
    };

    const wrapper = shallow(
      <DropdownBoxPopup
        {...props}
      />
    );
    expect(wrapper.find('.b-dropdown-box__popup')).to.have.length(1);
    expect(wrapper.find('.b-dropdown-box__popup-inner')).to.have.length(1);
    wrapper.unmount();
  });
});
