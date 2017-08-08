import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ButtonMultipleItem extends PureComponent {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    renderItemElement: PropTypes.func,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  handleOnMouseDown = (e) => {
    e.preventDefault();
    this.setState({
      isActive: true
    });
  };

  handleOnMouseUp = () => {
    this.setState({
      isActive: false
    });
  };

  handleOnClick = (e) => {
    e.stopPropagation();
    const { id, onClick } = this.props;
    onClick(id);
  };

  render() {
    const { id, title, renderItemElement } = this.props;
    const { isActive } = this.state;

    const elementClassName = classnames(
      'b-button__multiple-item',
      isActive && 's-active'
    );

    return (
      <div
        className={elementClassName}
        onMouseDown={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onClick={this.handleOnClick}
      >
        {renderItemElement ?
          renderItemElement(id) :
          <div className="b-button__multiple-item-title">
            {title}
          </div>
        }
      </div>
    );
  }
}

export default ButtonMultipleItem;
