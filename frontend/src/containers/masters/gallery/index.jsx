import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import GalleryItem from './gallery-item';
import {
  GalleryBlock,
  WrapGallery,
  AuthorInfo,
  AuthorName,
  AuthorPic,
  AuthorSection
} from './style.js';

const Gallery = ({ authors }) => (
  <GalleryBlock>
    {authors.map(master => (
      <AuthorSection key={master.get('id')}>
        <AuthorInfo>
          <AuthorPic src={master.get('photo')} />
          <AuthorName>{master.get('name')}</AuthorName>
        </AuthorInfo>
        <WrapGallery>
          {master.get('tattoo').map((tattoo, i) => (
            <GalleryItem key={i} src={tattoo} />
          ))}
        </WrapGallery>
      </AuthorSection>
    ))}
  </GalleryBlock>
);

Gallery.propTypes = {
  authors: PropTypes.instanceOf(List).isRequired
};

export default Gallery;
