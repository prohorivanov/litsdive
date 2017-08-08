import styled from 'styled-components';
import { media } from 'assets/styles/style-utils.js';
// import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js';

export const MatersLayout = styled.div` 
  position: relative;
  height: 100%;
  width: 100%;  
`;


export const MainColl = styled.div`
  height: 100%;
  width: 100%;
  ${media.mobile`
    margin-left: 0;
  `}
`;

export const Contacts = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const Author = styled.div`
  position: relative;
`;