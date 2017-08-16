import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DropdownBoxPopup extends Component {
  static propTypes = {
    testLocator: PropTypes.string,
    openerElement: PropTypes.object.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    onEnter: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    maxHeight: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element, PropTypes.string])
  };

  constructor(props) {
    super(props);

    this.state = {
      bodyElementBounding: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 },
      openerElementBounding: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 },
      innerElementBounding: { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 }
    };

    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleDocumentScroll = this.handleDocumentScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.bodyElement = document.querySelector('#app');
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize);
    document.addEventListener('scroll', this.handleDocumentScroll);
    document.addEventListener('click', this.handleClick, true);
    document.addEventListener('touchstart', this.handleClick, true);
    document.addEventListener('keydown', this.handleKeyDown);
    this.handleWindowResize();
  }

  componentWillReceiveProps() {
    this.setState({
      ...this.getOffset(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    document.removeEventListener('scroll', this.handleDocumentScroll);
    document.removeEventListener('click', this.handleClick, true);
    document.removeEventListener('touchstart', this.handleClick, true);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  getOffset = () => {
    const bodyElementBounding = this.bodyElement.getBoundingClientRect();
    const openerElementBounding = this.props.openerElement.getBoundingClientRect();
    const innerElementBounding = this.innerElement ? this.innerElement.getBoundingClientRect() : { top: 0, right: 0, bottom: 0, left: 0, width: 0, height: 0 };
    return {
      bodyElementBounding,
      openerElementBounding,
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
    if (!e.target.closest(`#${this.elementId}`)) {
      this.props.onClose(e);
    }
  }

  handleKeyDown(e) {
    if (e.which === 38) {
      this.props.onPrev(e);
    }
    if (e.which === 40) {
      this.props.onNext(e);
    }
    if (e.which === 13) {
      this.props.onEnter(e);
    }
    if (e.which === 27) {
      this.props.onClose(e);
    }

    // чтобы не скролилось окно
    e.preventDefault();
  }

  render() {
    const { children, maxHeight, testLocator } = this.props;
    const { bodyElementBounding, openerElementBounding, innerElementBounding } = this.state;
    this.elementId = `_popupBox_${Date.now()}`;

    const topSpace = openerElementBounding.top - bodyElementBounding.top;
    const bottomSpace = bodyElementBounding.bottom - openerElementBounding.bottom;
    let top = 'auto';
    let bottom = 'auto';
    let maxHeightCalc = 'auto';
    if (bottomSpace > topSpace || bottomSpace > innerElementBounding.height) {
      top = openerElementBounding.height + 4;
      maxHeightCalc = bottomSpace - 12;
    } else {
      bottom = openerElementBounding.height + 4;
      maxHeightCalc = topSpace - 12;
    }
    const style = {
      top,
      bottom,
      maxHeight:  maxHeight || maxHeightCalc
    };

    return (
      <div
        id={this.elementId}
        data-loc={testLocator}
        className="b-dropdown-box__popup"
        style={style}
        role="listbox"
        onMouseLeave={this.handleOnMouseLeave}
      >
        <div className="b-dropdown-box__popup-inner" ref={(element) => { this.innerElement = element; }}>
          {children && children}
        </div>
      </div>
    );
  }
}

export default DropdownBoxPopup;
