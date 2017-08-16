import React, { Component } from 'react';
import ReactDOM             from 'react-dom';
import TooltipContent       from './tooltip';


export default class Tooltip extends Component {

  componentDidMount() {
    this._renderTooltip(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._renderTooltip(nextProps);
  }


  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(
      document.querySelector('#Tooltip')
    );
  }

  /**
   *
   * @param props
   * @private
   */
  _renderTooltip(props) {
    ReactDOM.render(
      <TooltipContent {...props} />,
      document.querySelector('#Tooltip')
    );
  }

  render() {
    return null;
  }
}
