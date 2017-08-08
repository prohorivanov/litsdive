import React from 'react';
import PropTypes from 'prop-types';
import Item from './multiple-item';

const ButtonMultipleSelect = (props) => {
  const { id, onItemClick, title, renderItemElement, items } = props;

  const handleItemClick = (itemId) => {
    onItemClick(id, itemId);
  };

  return (
    <div className="b-button__multiple-select">
      <div className="b-button__multiple-select-title">
        {title}
      </div>
      <div className="b-button__multiple-select-items">
        {items.map((item, key) => (
          <Item
            key={key}
            id={item.id}
            title={item.title}
            renderItemElement={renderItemElement}
            onClick={handleItemClick}
          />
        ))}
      </div>
    </div>
  );
};

ButtonMultipleSelect.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  renderItemElement: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string
  })).isRequired,
  onItemClick: PropTypes.func.isRequired
};


export default ButtonMultipleSelect;
