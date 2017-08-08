import React, {
  Component,
  PropTypes
} from 'react';
import { MatchMediaRegister } from 'dal/match-media/actions';

import {
  RootLayout
} from './style.js';

class RootWrapperLayout extends Component {
  
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  static childContextTypes = {
    changeClassName: PropTypes.func
  }

  constructor() {
    super();
    MatchMediaRegister();
  }
  
  state = {
    customClassName: ''
  }
  
  /**
   *
   * @returns {{changeClassName: (function())}}
   */
  getChildContext() {
    return {
      changeClassName: this.changeClassName
    };
  }
  
  changeClassName = (klass) => {
    this.setState({ customClassName: klass });
  }
  
  render() {
    const { className, children } = this.props;
    const { customClassName } = this.state;

    return (
      <RootLayout className={className} customClassName={customClassName}>
        {children}
      </RootLayout>
    );
  }
}

export default RootWrapperLayout;
