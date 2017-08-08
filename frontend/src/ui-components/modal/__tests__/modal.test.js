/* eslint-disable react/jsx-filename-extension */
import React                      from 'react';
import { expect }                 from 'chai';
import { spy }                    from 'sinon';
import { mount, shallow }         from 'enzyme';
import Fade                       from 'ui-components/fade-overlay';
import Icon                       from 'ui-components/icon';
import Modal                      from '../modal';

describe('Modal tests', () => {
  const context = { scrollTop: () => true };
  
  /**
   * рендер модального окна внутри overlay
   */
  it('Renders <Modal /> with overlay ', () => {
    const wrapper = mount(
      <Modal withOverlay>
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find('.b-ui-modal')).to.have.length(1);
    expect(wrapper.find(Fade)).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__wrapper')).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__td')).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__window')).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__window-content')).to.have.length(1);
    wrapper.unmount();
  });
  
  /**
   * Модальное окно не центрированное, находится сверху
   */
  it('Renders <Modal /> top, not center ', () => {
    const wrapper = mount(
      <Modal withOverlay topContent>
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find('.b-ui-modal')).to.have.length(1);
    expect(wrapper.find(Fade)).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__window-top')).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__window-content-top')).to.have.length(1);
    wrapper.unmount();
  });
  
  
  /**
   * При отрисовке модальное окно ставит class на body
   */
  it('<Modal /> set body classes ', () => {
    function waitFor() {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    }
    const wrapper = mount(
      <Modal withOverlay>
        <div>123</div>
      </Modal>
    );
  
    return waitFor().then(() => {
      let className = document.body.className;
      expect(className.includes('show-modal')).to.be.true;
      expect(className.includes('no-scroll')).to.be.true;
      expect(className.includes('show-modal-')).to.be.true;
      wrapper.unmount();
      className = document.body.className;
      expect(className.includes('show-modal')).to.be.false;
      expect(className.includes('no-scroll')).to.be.false;
    });
  });
  
  /**
   * При отрисовке модальное окно ставит globalModalId class на body
   */
  it('<Modal /> set body globalModalId classes ', () => {
    function waitFor() {
      return new Promise((resolve) => {
        setTimeout(resolve, 500);
      });
    }
    const wrapper = mount(
      <Modal withOverlay globalModalId="TestGlobalModalId">
        <div>123</div>
      </Modal>
    );
    
    return waitFor().then(() => {
      let className = document.body.className;
      expect(className.includes('show-modal-TestGlobalModalId')).to.be.true;
      wrapper.unmount();
      className = document.body.className;
      expect(className.includes('show-modal-TestGlobalModalId')).to.be.false;
    });
  });
  
  
  /**
   * рендер модального окна без overlay
   */
  it('Renders <Modal /> without overlay ', () => {
    const wrapper = shallow(
      <Modal withOverlay={false}>
        <div>123</div>
      </Modal>,
      { context }
    );
    expect(wrapper.find('.b-ui-modal')).to.have.length(1);
    expect(wrapper.find(Fade)).to.have.length(0);
    expect(wrapper.find('.b-ui-modal__wrapper')).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__td')).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__window')).to.have.length(1);
    expect(wrapper.find('.b-ui-modal__window-content')).to.have.length(1);
    wrapper.unmount();
  });
  
  
  /**
   * тестируем закрытие окна по клику на крестик
   */
  it('Close <Modal /> click', () => {
    const onClose = spy();
    const wrapper = mount(
      <Modal onClose={onClose}>
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find('.b-ui-modal')).to.have.length(1);
    expect(wrapper.find(Fade)).to.have.length(1);
    
    wrapper.find(Icon).simulate('click');
    expect(onClose).to.have.property('callCount', 1);
    wrapper.unmount();
  });
  
  /**
   * тестируем закрытие окна по клику по overlay
   */
  it('Close <Modal /> click overlay ( call onCloseModalOverlay )', () => {
    const onClose = spy();
    const wrapper = mount(
      <Modal onClose={onClose}>
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find('.b-ui-modal')).to.have.length(1);
    expect(wrapper.find(Fade)).to.have.length(1);
    expect(wrapper.find(Icon)).to.have.length(1);
    
    wrapper.find(Fade).simulate('click');
    expect(onClose).to.have.property('callCount', 1);
    wrapper.unmount();
  });
  
  /**
   * тестируем закрытие окна по ESC
   */
  it('Close <Modal /> click ESC', () => {
    const onClose = spy();
    
    function waitFor() {
      return new Promise((resolve) => {
        const event = new Event('keyup');
        event.keyCode = 27;
        event.which = 27;
        document.dispatchEvent(event);
        resolve();
      });
    }
    
    const wrapper = mount(
      <Modal onClose={onClose}>
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find(Icon)).to.have.length(1);
    
    return waitFor().then(() => {
      expect(onClose).to.have.property('callCount', 1);
      wrapper.unmount();
    });
  });
  
  
  /**
   * запрещаем закрывать окно по клику в не зоны контента окна
   */
  it('Stop Close <Modal /> click overlay', () => {
    const onClose = spy();
    const wrapper = mount(
      <Modal onClose={onClose} stopClose>
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find('.b-ui-modal')).to.have.length(1);
    expect(wrapper.find(Fade)).to.have.length(1);
    expect(wrapper.find(Icon)).to.have.length(1);
    
    wrapper.find(Fade).simulate('click');
    expect(onClose).to.have.property('callCount', 0);
    wrapper.unmount();
  });
  
  /**
   * прячем крестик закрытия окна
   */
  it('Hide close button <Modal />', () => {
    const wrapper = mount(
      <Modal hideCloseButton>
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find('.b-ui-modal')).to.have.length(1);
    expect(wrapper.find(Fade)).to.have.length(1);
    expect(wrapper.find(Icon)).to.have.length(0);
    wrapper.unmount();
  });
  
  /**
   * Кастомный класс на контейнер с контентом
   */
  it('Add <Modal /> classNameContent', () => {
    const wrapper = mount(
      <Modal classNameContent="NewClassNameContent">
        <div>123</div>
      </Modal>
    );
    expect(wrapper.find('.b-ui-modal__window-content.NewClassNameContent')).to.have.length(1);
    wrapper.unmount();
  });
});
