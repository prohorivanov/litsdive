import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from 'ui-components/icon';
import PopupBox from 'ui-components/popup-box';
import Item from './multiple-item';
import Select from './multiple-select';

class ButtonMultiple extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      isDefault: PropTypes.bool,
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string,
      renderItemElement: PropTypes.func
    })).isRequired,
    parentElement: PropTypes.object,
    isDisabled: PropTypes.bool,
    onItemClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isPopupOpen: false,
      isToggleActive: false
    };
  }

  handleToggleOnMouseDown = (e) => {
    e.preventDefault();
    const { isDisabled } = this.props;
    if (!isDisabled) {
      this.setState({
        isActive: true
      });
    }
  };

  handleToggleOnMouseUp = () => {
    this.setState({
      isToggleActive: false
    });
  };

  handlePopupOpen = () => {
    const { isDisabled } = this.props;
    if (!isDisabled) {
      this.setState({
        isPopupOpen: true
      });
    }
  };

  handlePopupClose = () => {
    this.setState({
      isPopupOpen: false
    });
  };

  handleItemClick = (itemId) => {
    const { onItemClick } = this.props;
    this.setState({
      isPopupOpen: false
    });
    onItemClick(itemId);
  };

  handleOnSelectItemClick = (itemId, selectItemId) => {
    const { onItemClick } = this.props;
    this.setState({
      isPopupOpen: false
    });
    onItemClick(itemId, selectItemId);
  };

  render() {
    const { items, parentElement } = this.props;
    const { isPopupOpen, isToggleActive } = this.state;

    const simpleItems = items.filter(item => item.type === 'simple');
    const selectItems = items.filter(item => item.type === 'select');

    const toggleClassName = classnames(
      'b-button__multiple-toggle',
      (isPopupOpen || isToggleActive) && 's-active'
    );

    return (
      <div className="b-button__multiple">
        <div
          ref={(element) => { this.toggleElement = element; }}
          className={toggleClassName}
          onClick={this.handlePopupOpen}
          onMouseDown={this.handleToggleOnMouseDown}
          onMouseUp={this.handleToggleOnMouseUp}
        >
          <div className="b-button__multiple-toggle-icon">
            <Icon type="dropdown" size="16" />
          </div>
        </div>
        {isPopupOpen &&
        <PopupBox
          openerElement={parentElement || this.toggleElement}
          onClose={this.handlePopupClose}
        >
          <div className="b-button__multiple-popup">
            <div className="button__multiple-items">
              {simpleItems.map((item, key) => (
                <Item
                  key={key}
                  id={item.id}
                  title={item.title}
                  onClick={this.handleItemClick}
                />
              ))}
              {!!selectItems.length && selectItems.filter(item => !!item.items.length).map((item, key) => (
                <Select
                  key={key}
                  id={item.id}
                  title={item.title}
                  items={item.items}
                  renderItemElement={item.renderItemElement}
                  onItemClick={this.handleOnSelectItemClick}
                />
              ))
              }
            </div>
          </div>
        </PopupBox>
        }
      </div>
    );
  }
}

export default ButtonMultiple;
