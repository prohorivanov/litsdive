import styled from 'styled-components';
import { COLORS } from 'assets/styles/style-vars.js';
import { media } from 'assets/styles/style-utils.js';

export const Flex = styled.div`
  display: flex;
  ${media.desktop1024`
    flex-direction: column;
  `}
`;

export const Body = styled.div`
  margin-bottom: 20px;
  input {
    width: 200px;
  }
`;

export const Row = Flex.extend`
  position: relative;
  align-self: center;
  margin-top: 24px;
  &:first-child {
    margin-top: 0px;
  }
  ${media.desktop1024`
    width: 100%;
  `}
`;

export const Wrapper = Flex.extend`
  flex-direction: column;
  padding-right: 30px;
  ${media.desktop1024`
    padding-right: 0;
    order: 2;
  `}
`;

export const Description = styled.div`
  padding-bottom: 30px;
  overflow: hidden; 
  order: 1;
`;

export const Footer = Flex.extend` 
  align-items: center;
  ${media.desktop1024`
     flex-direction: column;
  `}
`;

export const FormErrors = styled.div` 
  align-self: center;
  font-size: 14px;
  color: ${COLORS.colorTomatoRed};
  ${media.desktop1024`
    margin-top: 10px;
  `}
`;

export const ButtonExtend = styled.button`
  width: 173px; 
  ${media.desktop1024`
    width: 100%;    
  `}
`;
