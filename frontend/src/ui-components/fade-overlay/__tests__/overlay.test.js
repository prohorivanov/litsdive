/* eslint-disable react/jsx-filename-extension */
import React                      from 'react';
import { expect }                 from 'chai';
import { spy }                    from 'sinon';
import { mount }                  from 'enzyme';
import Fade                     from '../index';
import styles                     from '../style.less';


describe('Fade tests', () => {
  it('Renders <Fade /> with overlay ', () => {
    const onClick = spy();
    const wrapper = mount(
      <Fade onClick={onClick} className="TestClassName">
        <div>qwew</div>
      </Fade>
    );
    expect(wrapper.find(`.${styles.fade}`)).to.have.length(1);
    
    wrapper.find(`.${styles.fade}`).simulate('click');
    expect(onClick).to.have.property('callCount', 1);
  
    expect(document.body.className).to.contain('show-modal');
    wrapper.unmount();
    expect(document.body.className).to.not.contain('show-modal');
  });
  
  it('<Fade /> layerStyle black ', () => {
    const onClick = spy();
    const wrapper = mount(
      <Fade onClick={onClick} className="TestClassName">
        <div>qwew</div>
      </Fade>
    );
    expect(wrapper.find(`.${styles.fade}`)).to.have.length(1);
    expect(wrapper.find({ style: { backgroundColor: 'rgba(0, 0, 0, .6)' } })).to.have.length(1);
  });
  
  it('<Fade /> layerStyle white ', () => {
    const onClick = spy();
    const wrapper = mount(
      <Fade onClick={onClick} className="TestClassName" layerStyle="white">
        <div>qwew</div>
      </Fade>
    );
    expect(wrapper.find(`.${styles.fade}`)).to.have.length(1);
    expect(wrapper.find({ style: { backgroundColor: 'rgba(255, 255, 255, .8)' } })).to.have.length(1);
  });
});
