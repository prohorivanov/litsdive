import styled from 'styled-components';
import DropdownBox from 'ui-components/dropdown-box';
import { COLORS, FONTS_SIZE } from 'assets/styles/style-vars.js';

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DropdownBoxExtend = styled(DropdownBox)`
  width: 65% !important;
`;

export const ErrorsWarning = styled.span`
  padding-top: 3px;
  font-size: 12px;
  color: ${COLORS.colorTangerine};
`;

export const Label = styled.label`
  position: relative; 
  width: 172px;
  margin-right: 24px;
  font-weight: bold; 
  font-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${COLORS.colorBlack}; 
  line-height: 1em;
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
