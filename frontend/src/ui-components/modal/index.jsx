import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import { Provider }           from 'react-redux';
import store                  from 'app/store';
import ModalContainer       from './modal';

/**
 * @todo рисуем Modal в body
 */
export default class Modal extends Component {

  componentDidMount() {
    this.div = document.querySelector('#ModalContainer');
    if (!this.div) {
      this.div = document.createElement('div');
      this.div.setAttribute('id', 'ModalContainer');
      document.body.appendChild(this.div);
    }
    setTimeout(() => {
      this._render(this.props);
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    this._render(nextProps);
  }


  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.div);
  }

  /**
   *
   * @param props
   * @private
   */
  _render(props) {
    ReactDOM.render(
      <Provider store={props.store || store}>
        <ModalContainer {...props} />
      </Provider>,
      this.div
    );
  }

  render() {
    return null;
  }
}
