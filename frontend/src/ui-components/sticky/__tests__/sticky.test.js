/* eslint-disable react/jsx-filename-extension */
import React                      from 'react';
import { expect }                 from 'chai';
import { mount }                  from 'enzyme';
import Sticky                     from '../index';
import styles                     from '../style.less';

describe('Sticky wrapper tests', () => {
  it('Renders <Sticky /> ', () => {
    const wrapper = mount(
      <Sticky topSpacing={100}>
        <div>123</div>
      </Sticky>
    );
    expect(wrapper.state().isFixed).to.be.false;
    expect(wrapper.find(`.${styles.TopFilters}`)).to.have.length(1);
    expect(wrapper.find(`.${styles.TopFiltersFixed}`)).to.have.length(0);
    expect(wrapper.find({ style: { height: 'auto' } })).to.have.length(1);
  
    wrapper.setState({ isFixed: true });
    expect(wrapper.find(`.${styles.TopFiltersFixed}`)).to.have.length(1);
    
    expect(wrapper.find({ style: { height: '100px' } })).to.have.length(1);
    expect(wrapper.find({ style: { top: '100px' } })).to.have.length(1);
  });
  
  it('Renders <Sticky /> with height ', () => {
    const wrapper = mount(
      <Sticky topSpacing={100} height="200">
        <div>123</div>
      </Sticky>
    );
    wrapper.setState({ isFixed: true });
    expect(wrapper.find(`.${styles.TopFiltersFixed}`)).to.have.length(1);
    expect(wrapper.find({ style: { height: '200px' } })).to.have.length(1);
    expect(wrapper.find({ style: { top: '100px' } })).to.have.length(1);
  });
});
