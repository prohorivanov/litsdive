import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import GalleryItem from './gallery-item'
import {
  WrapGallery,
  GalleryBlock
} from './style.js'

const Gallery = ({products}) => (
  <GalleryBlock>
    <WrapGallery>
      {products.map((item, i) => (
        <GalleryItem key={i} {...item.toJS()} />
      ))}
    </WrapGallery>
  </GalleryBlock>
)

Gallery.propTypes = {
  products: PropTypes.instanceOf(List).isRequired
}

export default Gallery
