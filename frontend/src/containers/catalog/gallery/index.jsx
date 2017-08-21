import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import GalleryItem from './gallery-item';
import {
  GalleryBlock,
  WrapGallery,
  ProductSection
} from './style.js';

const Gallery = ({ authors }) => (
  <GalleryBlock>
    {authors.map(master => (
      <ProductSection key={master.get('id')}>
        <WrapGallery>
          {master.get('tattoo').map((tattoo, i) => (
            <GalleryItem key={i} src={tattoo} />
          ))}
        </WrapGallery>
      </ProductSection>
    ))}
  </GalleryBlock>
);

Gallery.propTypes = {
  authors: PropTypes.instanceOf(List).isRequired,
};

export default Gallery;

