import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Figure,
  ProductName,
  ProductImage,
  ProductInfo
} from './style.js';

class GalleryItem  extends PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired
  }

  render() {
    const { src } = this.props;
    return (
      <Figure>
        <ProductImage src={src} onClick={this.onShowDetailTattoo}>
          <ProductInfo>
            <ProductName>124</ProductName>
          </ProductInfo>
        </ProductImage>
      </Figure>
    );
  }
}

export default GalleryItem;
