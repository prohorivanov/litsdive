import styled from 'styled-components';
import { rgba } from 'polished';
import { media } from 'assets/styles/style-utils.js';
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js';

export const Author = styled.div`
  position: relative;
`;

export const AuthorName = styled.div`
  color: ${COLORS.colorBlack};
  font-size: ${FONTS_SIZE.fontSizeNormal};
  position: absolute;
  bottom: 4px;
  left: 0;
  padding: 5px;
  background-color: ${COLORS.colorWhite}; 
`;

export const AuthorInfo = styled.div`
  display: flex; 
  flex-direction: row;  
`;

export const AuthorPic = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${props => props.src || ''});
  background-size: cover;    
`;

export const AuthorDesc = styled.div`
  padding: 20px;
`;

export const AuthorDetail = styled.div`
  color: ${COLORS.colorBlack};
  font-size: ${FONTS_SIZE.fontSizeExtraLarge};
  margin-bottom: 10px;
`;


export const GalleryBlock = styled.div`
  position: relative;
`;

export const WrapGallery = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap; 
  ${media.mobile`
    flex-direction: column;
  `}
`;

export const TattooImage = styled.div`
  width: 300px; 
  height: 400px;  
  background-image: url(${props => props.src || ''});
  background-size: cover;
  background-position: 50% 50%;
  ${media.iphone6`    
    width: 100%;    
  `}
`;

export const TattooImageDetail = styled.img`
  width: 100%;       
`;

export const Figure = styled.div`
  position: relative;
  margin: 0 15px 15px 0;  
  width: 300px; 
  height: 400px;
  cursor: pointer;
  transition: transform .2s ease; 
  &:hover {
    transform: scale(1.020);
    box-shadow: 1px 1px 8px ${rgba(COLORS.colorWarmGreyTwo, 0.4)};
    z-index: 10;
  }           
  ${media.iphone6`    
    width: 100%;
    margin-right: 0px;
  `}    
`;
