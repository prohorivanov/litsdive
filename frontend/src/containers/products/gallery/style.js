import styled from 'styled-components';
import { rgba } from 'polished';
import { media } from 'assets/styles/style-utils.js';
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js';

export const Author = styled.div`
  position: relative;
`;

export const ProductInfo = styled.div`
  position: absolute;
  height: 150px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${rgba(COLORS.colorWhite, 0.5)};      
`;


export const ProductName = styled.div`
  color: ${COLORS.colorBlack};
  font-size: ${FONTS_SIZE.fontSizeLarge};   
`;

export const ProductSection = styled.div`  
  margin-bottom: 80px;    
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

export const ProductImage = styled.div`
  position: relative;
  width: 300px; 
  height: 400px;  
  background-image: url(${props => props.src || ''});
  background-size: cover;
  ${media.mobile`    
    width: 100%;    
  `}
`;

export const Figure = styled.div`
  margin: 0 15px 15px 0;  
  width: 300px; 
  height: 400px;
             
  ${media.mobile`    
    width: 100%;
    margin-right: 0px;
  `}    
`;
