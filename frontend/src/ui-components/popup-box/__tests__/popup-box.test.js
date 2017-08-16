/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import PopupBox from '../index';

describe('PopupBox UI Component', () => {
  it('render', () => {
    const props = {
      openerElement: {},                                                                         // eslint-disable-line react/no-unused-prop-types
      onClose: jest.fn()
    };

    const wrapper = shallow(
      <div>
        <PopupBox
          {...props}
        />
      </div>
    );
    expect(wrapper.find('.b-popup-box')).to.have.length(0);
    wrapper.unmount();
  });
});
