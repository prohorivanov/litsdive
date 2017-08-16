import styled from 'styled-components';
import Modal  from 'ui-components/modal';
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js';

export const Flex = styled.div`
  display: flex;
`;

export const DirectionColumn = Flex.extend`
  flex-direction: column;
`;


export const Layout = styled.div`
  position: relative;
  padding-bottom: 50px; 
`;

export const ModalExtend = styled(Modal)`
  .b-ui-modal__window {
    width: 620px;
    padding: 0;
  }
`;

export const Info = styled.div`
  margin-bottom: 16px;
  margin-left: -16px;
  margin-right: -16px;
  padding: 12px 16px;
  font-size: ${FONTS_SIZE.fontSizeSmall};
  background-color: ${COLORS.colorParchment};
`;

export const InfoError = Info.extend` 
  background-color: ${COLORS.colorPaleRed};
`;

export const Row = styled.div`
  position: relative;
  margin-top: 16px;
  &:first-child {
    margin-top: 0px;
  }
`;

export const RowFlex = Row.extend`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const CollLabel = styled.div`
  flex-basis: 172px;
  font-weight: bold; 
  margin-right: 24px;
  font-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${COLORS.colorBlack};
`;

export const CollDescription = styled.div` 
  flex-basis: 65%;
  font-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${COLORS.colorBlack};
`;
