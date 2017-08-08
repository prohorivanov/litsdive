import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './style.less';

class Fade extends Component {
  
  static propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    layerStyle: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ]).isRequired
  }
  
  state = {
    enumLayer: {
      white: 'rgba(255, 255, 255, .8)',
      black: 'rgba(0, 0, 0, .6)',
    }
  }
  
  componentDidMount() {
    document.querySelector('body')
      .classList.add('show-modal');
  }
  
  componentWillUnmount() {
    document.querySelector('body')
      .classList.remove('show-modal');
  }
  
  render() {
    const { style, onClick, layerStyle } = this.props;
    const { enumLayer } = this.state;
    
    const styleFade = {
      ...style,
      backgroundColor: enumLayer[layerStyle] || enumLayer.black
    };
    
    return (
      <div className={styles.fade} style={styleFade} onClick={onClick}>
        {this.props.children}
      </div>
    );
  }
}

export default Fade;

