import styled from 'styled-components';
import { Link } from 'react-router';
import { COLORS, FONTS, FONTS_SIZE } from 'assets/styles/style-vars.js';

export const Layout = styled.div`
  position: relative;
  padding-bottom: 50px;
`;

export const Header = styled.section`
  padding: 16px 32px;
  border-bottom: 1px solid ${COLORS.colorMarigold}
`;

export const Body = styled.section` 
  display: flex;  
  flex-direction: row;
`;

export const CollLeft = styled.div` 
  width: 248px;
`;

export const CollRight = styled.div`
  padding: 16px 24px; 
  width: calc(100% - 248px);
  border-left: 1px solid ${COLORS.colorLightGrey}
`;

export const H2 = styled.h2`
  line-height: 34px;
  font-size: ${FONTS_SIZE.fontSizeH2Small};
`;

export const SectionTitle = styled.div`
   margin-bottom: 20px; 
   border-bottom: 1px solid ${COLORS.colorLightGrey};     
   h3 {   
    font-weight: bold;
    font-size: 14px;
    color: ${COLORS.colorDarkSkyBlue};
    text-transform: uppercase;   
   }
`;

export const ShadowBlockExtend = styled.div`
  max-width: 1000px;  
  margin: 40px auto; 
  border-radius: 2px;  
  position: relative;
  background: @colorWhite;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.4);
  padding: 0;
`;

export const LinkItemStyle = styled(Link)`
  display: block; 
  padding: 16px 24px;  
  cursor: pointer;
  white-space: nowrap;
  
  color: ${COLORS.colorBlack} !important;
  text-decoration: none;
    
  &:active,
  &:hover {
    text-decoration: none;
    color: ${COLORS.colorBlack} !important;
  }
  &.active {
    font-weight: bold;
    background-color: ${COLORS.colorWhiteThree};
  }
`;


export const Input = styled.input`
  width: auto;
  flex-grow: 1;  
  box-sizing: border-box;
  border: solid
          ${props => (props.error ? '2px' : '1px')}
          ${props => (props.error ? COLORS.colorTomatoRed : COLORS.colorPinkishGrey)} !important;  
  border-radius: 3px;
  height: 36px;
  padding: 0 8px;
  background: none;

  font-family: ${FONTS.Helvetica};
  font-size: 14px;
  color: ${COLORS.colorBlack}; 
  line-height: 17px;
  min-width: 1px;
  min-height: 1px;
  width: auto !important;
  flex-grow: 1 !important;
   
  
  &:hover {
    outline: none;
  }
  &:active,
  &:focus {
    outline: none;
    border: solid 1px ${COLORS.colorPerrywinkle};
    box-shadow: 0 0 4px 0 ${COLORS.colorBluish};
  }

  &[disabled] {
     opacity: .4;
  }
  &[readonly] {
    background-color: rgba(0, 0, 0, .2);
    &:focus {
        background-color: rgba(0, 0, 0, .2);
        color: inherit;
        box-shadow: none;
    }
  }
`;
