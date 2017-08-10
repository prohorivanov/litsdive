import React from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import GalleryItem from './gallery-item'
import {
  WrapGallery,
  GalleryBlock
} from './style.js'

const Gallery = ({gallery}) => (
  <GalleryBlock>
    <WrapGallery>
      {gallery.get('images').map((item, i) => (
        <GalleryItem key={i} {...item.toJS()} />
      ))}
    </WrapGallery>
  </GalleryBlock>
)

Gallery.propTypes = {
  gallery: PropTypes.instanceOf(Map).isRequired
}

export default Gallery
