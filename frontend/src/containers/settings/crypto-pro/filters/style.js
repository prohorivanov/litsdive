import styled from 'styled-components';
import DropdownBox from 'ui-components/dropdown-box';
import Icon from 'ui-components/icon';
import { COLORS, FONTS_SIZE, FONTS } from 'assets/styles/style-vars.js';

export const Wraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
`;

export const FiltersBlock = styled.div`
  position: relative;
  margin-bottom: 35px;
  margin-right: 40px;
`;

export const DropdownBoxExtend = styled(DropdownBox)`
  width: 227px; 
  position: relative; 
  &:nth-child(2) {
    margin-left: 8px;
    margin-right: 7px;
  }  
`;


export const StatusValue = styled.div`
  position: relative;
`;

export const Plus = styled.span`
  position: absolute;
  left: 8px;
  top: 50%;
  margin-top: -8px;
  width: 16px;
  height: 16px;
  
  &:after, 
  &:before {
    content: '';
    display: block;
    position: absolute;
    background-color: #fff;          
  }
  
  &:before {
    width: 100%;
    height: 1px;
    top: 50%;
    transform: translateY(-50%);
    left: 0;          
  }
  
  &:after {
    width: 1px;
    height: 100%;
    top: 0;
    transform: translateX(-50%);
    left: 50%;      
  }
`;

export const StatusValueCrear = styled(Icon)`
  position: absolute;
  right: 0px;
  top: 7px; 
  width: 10px !important;
  height: 10px !important;
  padding: 0 !important;
  svg {
    left: 0px !important;
    top: 0px !important;
    width: 10px !important;
    height: 10px !important;  
  } 
`;


export const ButtonCreateNewCert = styled.button`    
  align-items: center;
  padding-left: 30px;
  position: relative;
  padding-right: 20px;
  border-radius: 3px;
  font-family: ${FONTS.Helvetica};
  font-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${COLORS.colorWhite};
  background-color: ${COLORS.colorBlack};
  height: 38px;
  &:hover,
  &:visited,
  &:active {
    color: ${COLORS.colorWhite};
    background-color: ${COLORS.colorBlack};  
  }
`;
