import styled from 'styled-components';
import Icon from 'ui-components/icon';
import { COLORS, FONTS_SIZE, FONTS } from 'assets/styles/style-vars.js';

export const Header = styled.section`
  padding: 16px 32px;
  border-bottom: 1px solid ${COLORS.colorMarigold}
`;

export const Body = styled.section`
  padding-bottom: 32px;
  padding: 24px 32px 32px;
`;

export const Footer = styled.section`
  position: relative;
  padding: 0 32px 32px;
`;

export const Gray = styled.span`
  color: ${COLORS.colorBlack};
  opacity: 0.54;
`;

export const Black = styled.span`
  color: ${COLORS.colorBlack};
`;

export const WorkCryptoPro = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  position: relative;
  padding-left: 65px;   
`;

export const LoadingText = styled.div`  
  font-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${COLORS.colorBlack};
  font-style: italic;
`;

// extended components
export const LoaderExtend = styled.div`    
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 20px;
`;

export const ButtonExtend = styled.button`    
  font-family: ${FONTS.Helvetica}; 
`;

export const ButtonWithIconPrint = styled.button`    
  font-family: ${FONTS.Helvetica};
  padding-left: 10px;
`;

export const IconForButton = styled(Icon)`    
  svg {
    fill: ${COLORS.colorWhite} !important;    
  }
`;
