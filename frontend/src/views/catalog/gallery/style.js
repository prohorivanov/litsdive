import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { media } from 'assets/styles/style-utils.js'
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js'

export const Description = styled(Link)`
  display: block;
  color: ${COLORS.colorBlack};
  font-size: ${FONTS_SIZE.fontSizeNormal};
  position: relative;
  bottom: 0px;
  left: 0;
  padding: 10px 0 0;
  background-color: ${COLORS.colorWhite}; 
`

export const GalleryBlock = styled.div`
  position: relative;
`

export const WrapGallery = styled.div`
  display: flex; 
  flex-direction: row;
  flex-wrap: wrap; 
  ${media.mobile`
    flex-direction: column;
  `}
`

export const ProductImage = styled.div`
  width: 179px; 
  height: 179px;  
  background-image: url(${props => props.src || ''});
  background-size: cover;
  background-position: 50% 50%;
  ${media.iphone6`    
    width: 100%;
    height: 400px;  
  `}
`

export const ProductTitle = styled.div`
  color: #656565;
  font-size: 12.5px;
  line-height: 15px;
  ${media.iphone6`    
    font-size: ${FONTS_SIZE.fontSizeH2};
    line-height: 25px;
  `}
`

export const ProductPrice = styled.div`
  color: ${COLORS.colorBlack};
  font-weight: bold;
  font-size: 12.5px;
  padding-top: 2px;
  line-height: 14.425px;
  ${media.iphone6`    
    font-size: ${FONTS_SIZE.fontSizeH2};
    line-height: 25px;
  `}
`

export const TattooImageDetail = styled.img`
  width: 100%;       
`

export const Figure = styled.div`
  position: relative;
  margin: 0 15px 15px 0;    
  cursor: pointer;  
  ${media.iphone6`    
    width: 100%;
    margin-right: 0px;
    margin-bottom: 20px;
  `}    
`

export const ModalExtend = styled.div`
  .b-ui-modal__window-content {
    line-height: 0;
  }    
`
