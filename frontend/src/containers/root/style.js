import styled from 'styled-components'
import { rgba } from 'polished'
import { media } from 'assets/styles/style-utils.js'
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js'

export const ContentWrapper = styled.div`  
  padding: 120px 30px 0;
  height: 100%;
`

export const IndexLayout = styled.div` 
  position: relative;
  min-height: 100%;
  ${media.desktop`
    width: 100%
  `}
`

export const HeaderBlock = styled.div`
  position: fixed;
  top: 0;
  width: 100%; 
  padding: 15px 30px 25px;   
  border-bottom: 1px solid ${COLORS.colorLightGrey};  
  box-shadow: 0px 1px 6px ${rgba(COLORS.colorWarmGreyTwo, 0.3)};
  z-index: 100;
  background-color: ${COLORS.colorWhite};
  ${media.tablet`    
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 10px;          
  `}
`

export const FooterBlock = styled.div`
  position: relative;  
  display: flex;    
  flex-direction: row;
  min-height: 300px;
  padding: 16px 24px;
  background-color: ${COLORS.colorGreyishBrownThree};
  color: ${COLORS.colorWhite}; 
`

export const MenuFooter = styled.div`
  display: flex;    
  flex-direction: column;
  a {
    display: inline-block;
    margin-bottom: 10px;
    color: ${COLORS.colorWhite} !important; 
    &:hover {
      color: ${COLORS.colorWhite} !important;  
    }
  }    
`

export const MapEmbed = styled.div`
  position: relative;
  margin-left: 30px;
  width: 200px;
  height: 200px;
  iframe {
    height: 200px !important;
    width: 200px !important;
  }
`

export const Logo = styled.a`    
  position: absolute;
  top: 0px;
  left: 30px;
`

export const LogoImg = styled.img` 
  width: 100px;
  height: 90px;   
`

export const LogoName = styled.a`
  display: flex;    
  flex-direction: column;
  font-weight: bold;
  font-size: 30px;
  line-height: 30px; 
  color: ${COLORS.colorBlack};
  margin-right: 20px; 
  ${media.tablet`
    margin-right: 0;    
  `}          
`

export const LogoWord1 = styled.span`
  display: inline-block;
  font-weight: bold;
  color: ${COLORS.colorBlack};
  margin-right: 5px; 
`

export const LogoWord2 = styled.span`
  display: inline-block;    
  font-weight: bold;
  color: ${COLORS.colorBlack};
`

export const MenuTop = styled.div`    
  padding-left: 110px;
  display: flex;
  flex-direction: row;  
  align-items: flex-end;
 
  ${media.tablet`
    flex-direction: column;
    align-items: flex-start;
  `}          
`

export const MenuTopInner = styled.div`  
  display: flex;
  flex-direction: row;  
  justify-content: space-between; 
  fort-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${COLORS.colorBlack};   
  a {
    display: inline-block;
    margin-right: 20px;
    &:last-child {
      margin-right: 0px;
    }
  }
`
