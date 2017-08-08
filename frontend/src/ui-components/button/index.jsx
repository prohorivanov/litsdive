import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'ui-components/icon';
import Multiple from './multiple';
import './style.css';

class Button extends Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isProgress: PropTypes.bool,
    dataLoc: PropTypes.string,

    type: PropTypes.oneOf([
      'primary',
      'secondary',
      'tertiary'
    ]).isRequired,
    title: PropTypes.string,
    icon: PropTypes.string,
    iconTitle: PropTypes.string,
    multiple: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      isDefault: PropTypes.bool,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })),

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
    const { isDisabled, isProgress } = this.props;
    if (!isDisabled && !isProgress) {
      this.setState({
        isActive: true
      });
    }
  };

  handleOnMouseUp = () => {
    this.setState({
      isActive: false
    });
  };

  handleOnClick = (e) => {
    e.stopPropagation();
    const { isDisabled, isProgress, onClick, multiple, items } = this.props;
    if (!isDisabled && !isProgress) {
      if (multiple) onClick(items.find(item => item.isDefault).id);
      else onClick();
    }
  };

  render() {
    const { isDisabled, dataLoc, isProgress, type, icon, title, iconTitle, multiple, items, onClick } = this.props;
    const { isActive } = this.state;

    const elementClassName = classnames(
      'b-button',
      type && `m-${type}`,
      isActive && 's-active',
      isDisabled && 's-disabled',
      isProgress && 's-progress'
    );

    return (
      <div
        data-loc={dataLoc}
        ref={(element) => { this.element = element; }}
        className={elementClassName}
      >
        <div
          className="b-button__main"
          onMouseDown={this.handleOnMouseDown}
          onMouseUp={this.handleOnMouseUp}
          onClick={this.handleOnClick}
        >
          {icon &&
          <div className="b-button__icon" title={iconTitle}>
            <Icon type={icon} size="16" />
          </div>
          }
          {title &&
          <div className="b-button__title">
            {title}
          </div>
          }
        </div>
        {multiple &&
        <Multiple
          items={items}
          parentElement={this.element}
          isDisabled={isDisabled || isProgress}
          onItemClick={onClick}
        />
        }
      </div>
    );
  }
}

export default Button;
