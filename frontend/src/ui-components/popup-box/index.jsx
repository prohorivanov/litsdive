import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from 'app/store';
import classnames from 'classnames';
import './style.css';

class PopupBox extends Component {
  static propTypes = {
    dataLoc: PropTypes.string,                                                                                          // eslint-disable-line react/no-unused-prop-types
    className: PropTypes.string,                                                                                        // eslint-disable-line react/no-unused-prop-types
    openerElement: PropTypes.object.isRequired,                                                                         // eslint-disable-line react/no-unused-prop-types
    isDontCloseByClick: PropTypes.bool,
    isDontCloseByEsc: PropTypes.bool,
    onClose: PropTypes.func.isRequired,
    closeOnMouseLeave: PropTypes.bool,
    containerElementSelector: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.string])          // eslint-disable-line react/no-unused-prop-types
  };

  constructor(props) {
    super(props);

    this.state = {
      bodyElementBounding: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 },
      openerElementBounding: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 },
      elementBounding: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 },
      innerElementBounding: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleDocumentScroll = this.handleDocumentScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);

    this.bodyElement = document.querySelector(this.props.containerElementSelector || 'body');
  }

  componentDidMount() {
    if (!this.popupBoxesElement) {
      this.popupBoxesElement = document.createElement('div');
      document.body.appendChild(this.popupBoxesElement);
    }
    ReactDOM.render(this._render(), this.popupBoxesElement);
    window.addEventListener('resize', this.handleWindowResize);
    document.addEventListener('scroll', this.handleDocumentScroll);
    document.addEventListener('click', this.handleClick, true);
    document.addEventListener('touchstart', this.handleClick, true);
    document.addEventListener('keydown', this.handleKeyUp);
    this.handleWindowResize();
  }

  componentWillReceiveProps(nextProps) {
    ReactDOM.render(this._render(nextProps), this.popupBoxesElement);
    this.setState({
      ...this.getOffset(),
    });
  }

  componentDidUpdate() {
    ReactDOM.render(this._render(), this.popupBoxesElement);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.popupBoxesElement);
    document.body.removeChild(this.popupBoxesElement);
    window.removeEventListener('resize', this.handleWindowResize);
    document.removeEventListener('scroll', this.handleDocumentScroll);
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('touchstart', this.handleClick, true);
    document.removeEventListener('keydown', this.handleKeyUp);
  }

  getOffset = () => {
    const bodyElementBounding = this.bodyElement.getBoundingClientRect();
    const openerElementBounding = this.props.openerElement.getBoundingClientRect();
    const elementBounding = this.element ? this.element.getBoundingClientRect() : { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
    const innerElementBounding = this.innerElement ? this.innerElement.getBoundingClientRect() : { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
    return {
      bodyElementBounding,
      openerElementBounding,
      elementBounding,
      innerElementBounding
    };
  };

  handleWindowResize() {
    this.setState({
      ...this.getOffset(),
    });
  }

  handleDocumentScroll() {
    this.setState({
      ...this.getOffset(),
    });
  }

  handleClick(e) {
    if (!this.props.isDontCloseByClick && !e.target.closest(`#${this.elementId}`)) {
      e.stopPropagation();
      this.props.onClose();
    }
  }

  handleKeyUp(e) {
    if (!this.props.isDontCloseByEsc && e.which === 27) {
      this.props.onClose();
    }
  }

  handleOnMouseLeave() {
    if (this.props.closeOnMouseLeave) {
      this.props.onClose();
    }
  }

  _render(props) {
    const { dataLoc, className, children } = props || this.props;
    const { bodyElementBounding, openerElementBounding, elementBounding, innerElementBounding } = this.state;
    const elementClassName = classnames('b-popup-box', className && className);
    this.elementId = `_popupBox_${Date.now()}`;

    const topSpace = openerElementBounding.top - bodyElementBounding.top;
    const bottomSpace = bodyElementBounding.bottom - openerElementBounding.bottom;
    const leftSpace = openerElementBounding.right - bodyElementBounding.left;
    const rightSpace = bodyElementBounding.right - openerElementBounding.left;
    const displayBottom = () => (
      bottomSpace > innerElementBounding.height ? openerElementBounding.bottom :
        bodyElementBounding.bottom - elementBounding.height
    );
    const displayTop = () => (
      topSpace > innerElementBounding.height ? openerElementBounding.top - elementBounding.height : 0
    );
    const top = bottomSpace > topSpace || bottomSpace > innerElementBounding.height ? displayBottom() : displayTop();

    const displayRight = () => (
      rightSpace > innerElementBounding.width ? openerElementBounding.left :
        bodyElementBounding.right - elementBounding.width
    );
    const displayLeft = () => (
      leftSpace > innerElementBounding.width ? openerElementBounding.right - elementBounding.width : 0
    );
    const left = rightSpace > leftSpace || rightSpace > innerElementBounding.width ? displayRight() : displayLeft();
    const style = { top, left };

    return (
      <Provider store={store}>
        <div
          ref={(element) => { this.element = element; }}
          data-loc={dataLoc}
          id={this.elementId}
          className={elementClassName}
          style={style}
          onMouseLeave={this.handleOnMouseLeave}
        >
          <div className="b-popup-box-inner" ref={(element) => { this.innerElement = element; }}>
            {children && children}
          </div>
        </div>
      </Provider>
    );
  }

  render() {
    return null;
  }
}

export default PopupBox;
