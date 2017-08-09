import React from 'react'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import GalleryItem from './gallery-item'
import {
  GalleryBlock,
  WrapGallery,
  AuthorInfo,
  AuthorName,
  AuthorPic,
  AuthorSection
} from './style.js'

const Gallery = ({galleries}) => (
  <GalleryBlock>
    {galleries.map(gallery => (
      <AuthorSection key={gallery.get('_id')}>
        <AuthorInfo>
          <AuthorPic src={gallery.getIn(['author', 'image', 'url'])}/>
          <AuthorName>{gallery.getIn(['author', 'name', 'first'])}</AuthorName>
        </AuthorInfo>
        <WrapGallery>
          {gallery.get('images').map((image, i) => (
            <GalleryItem key={i} src={image.get('url')}/>
          ))}
        </WrapGallery>
      </AuthorSection>
    ))}
  </GalleryBlock>
)

Gallery.propTypes = {
  galleries: PropTypes.instanceOf(List).isRequired
}

export default Gallery
