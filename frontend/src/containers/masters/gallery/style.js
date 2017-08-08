import styled from 'styled-components';
import { media } from 'assets/styles/style-utils.js';
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js';

export const Author = styled.div`
  position: relative;
`;

export const AuthorInfo = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 20px;    
`;

export const AuthorPic = styled.div`
  width: 200px; 
  height: 200px;  
  background-image: url(${props => props.src || ''});
  background-size: cover;
  margin-right: 15px;
  border-radius: 50%;
  ${media.mobile`        
    margin-right: 0;
  `}
`;

export const AuthorName = styled.div`
  color: ${COLORS.colorBlack};
  font-size: ${FONTS_SIZE.fontSizeH1};
  font-weight: bold;
  line-height: 20px;
`;

export const AuthorSection = styled.div`  
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

export const TattooImage = styled.div`
  width: 300px; 
  height: 400px;  
  background-image: url(${props => props.src || ''});
  background-size: cover;
  ${media.mobile`    
    width: 100%;    
  `}
`;

export const TattooImageDetail = styled.img`
  width: 100%; 
  height: 100%;      
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
