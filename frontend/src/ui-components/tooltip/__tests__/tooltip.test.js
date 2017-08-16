/* eslint-disable react/jsx-filename-extension */
import React            from 'react';
import { expect }       from 'chai';
import { spy }          from 'sinon';
import { mount }        from 'enzyme';
import { TooltipStatic } from '../tooltip';
import styles            from '../style.less';

describe('<Tooltip /> tests', () => {
  const tooltipPosition = {
    top : 0,
    left: 0
  };


  it('Renders <TooltipStatic /> ', () => {
    const onClose = spy();
    const wrapper = mount(
      <TooltipStatic
        style={{ padding: '25px' }}
        noAnimation
        position={tooltipPosition}
        positionType="right bottom"
        onClose={onClose}
        className="TitleBorderBlockClass"
      >
        <div>dsfsdf</div>
      </TooltipStatic>
    );
    expect(wrapper.find('.TitleBorderBlockClass')).to.have.length(1);
    expect(wrapper.find(`.${styles.Tooltip}`)).to.have.length(1);
    wrapper.unmount();
  });
});
