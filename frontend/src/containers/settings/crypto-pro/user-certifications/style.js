import styled from 'styled-components';
import { COLORS, FONTS_SIZE, FONTS } from 'assets/styles/style-vars.js';
import { rgba } from 'polished';
import Icon from 'ui-components/icon';
import {
  STATUSES_COLOR,
  ALLOW_OPACITY_STATUSES_COLOR,
  ADDITIONAL_STATUS_EXPIRING,
  ENTITY_STATUS_CERT_ONLY,
  ENTITY_STATUS_REG_WITH_CERT
} from '../constants';


function colorStatus(status, additionalStatus, opacity = 0.87) {
  const statusResult = (additionalStatus === ADDITIONAL_STATUS_EXPIRING) ? 'activeExpired' : status;
  return rgba(STATUSES_COLOR[statusResult], opacity);
}

export const Flex = styled.div`
  display: flex;
`;

export const Header = styled.section`
  padding: 16px 32px;
  border-bottom: 1px solid ${COLORS.colorMarigold}
`;

export const BodyDetail = styled.section` 
  padding 16px 32px;
`;

export const Gray = styled.span`
  color: ${COLORS.colorBlack};
  opacity: 0.54;
`;

export const Black = styled.span`
  color: ${COLORS.colorBlack};
`;

export const FooterDetail = styled.div`
  position: relative;
  padding: 0 32px 32px;
`;

export const ListBlock = styled.section`
  position: relative;    
  min-height: 200px;
`;

export const Item = styled.div`
  position: relative;  
  background-color: ${COLORS.colorWhite};
  margin-bottom: 8px;
  padding-right: 40px;
  min-height: 88px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const ItemInner = Flex.extend`
  position: relative;
  padding: 24px 15px;    
  min-height: 88px;   
  box-shadow: ${props => (
  !props.isMouseEnter
    ? '0 1px 4px 0 rgba(0, 0, 0, 0.12'
    : '0 4px 12px 0 rgba(0, 0, 0, 0.2);'
  )});
  &:hover {
    cursor: pointer;
  }
`;

export const Operations = Flex.extend` 
  flex-direction: column;  
  display: ${props => (props.isMouseEnter ? 'flex' : 'none')};
  position: absolute;
  width: 20px;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;       
`;

export const OperationsButtonContainer = Flex.extend` 
   
`;

export const CertDetail = styled.div` 
   
`;

export const RequestDetail = styled.div` 
   
`;

export const DetailRequestToggler = styled.div` 
  font-size: ${FONTS_SIZE.fontSizeNormal};
  line-height: 1;
  text-align: left;
  margin: 24px 0 16px;
  cursor: pointer;
  color: ${COLORS.colorBluish};
`;

export const ItemBorder = styled.div`
  position: absolute;
  width: 2px;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${(props) => {
    const opacity = ALLOW_OPACITY_STATUSES_COLOR.includes(props.status) ? 0.2 : 1;
    return colorStatus(props.status, props.additionalStatus, opacity);  
  }};
`;

export const CollItemLeft = styled.div`
  width: 60%;
`;

export const CollItemRight = styled.div`
  width: 40%;  
  line-height: 1.43;
  text-align: right;
  font-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${rgba(COLORS.colorBlack, 0.54)};  
`;
export const Name = Flex.extend`
  align-items: flex-end;
  position: relative;
  height: 20px;
  padding-left: 25px;
  font-size: ${FONTS_SIZE.fontSizeNormal};
  font-weight: bold;
`;

export const NameTitle = styled.span`
  line-height: 1em 
`;
export const CompanyLabel = styled.span`  
  color: ${rgba(COLORS.colorBlack, 0.54)}; 
`;
export const CompanyName = styled.div`
  padding-top: 4px;
  overflow: hidden;  
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: ${FONTS_SIZE.fontSizeNormal}; 
`;

export const StatusLabel = styled.div`
  color: ${props => colorStatus(props.status, props.additionalStatus)};
  ${props => (
    props.entityType === ENTITY_STATUS_REG_WITH_CERT || props.additionalStatus === ENTITY_STATUS_CERT_ONLY 
      ? 'font-weight: bold;' 
      : null  
  )}   
  svg {
    fill: ${props => colorStatus(props.status, props.additionalStatus)}; 
  }
`;

export const StatusLabelDetail = StatusLabel.extend`
  display: inline-block;
  padding-left: 4px;
`;

export const HeaderStatusDetail = styled.div`
  
`;

export const DateItem = styled.div`
  font-size: ${FONTS_SIZE.fontSizeNormal};
  color: ${rgba(COLORS.colorBlack, 0.54)};
  padding-top: 3px; 
`;

export const IconUser = styled(Icon)`
  position: absolute;
  left: 0;
  top: 0;
`;

export const IconOperations = styled(Icon)`
  cursor: pointer;  
  margin-bottom: 16px; 
  padding: 0;
  svg {
    top: 0px !important;
    left: 0px !important;
  }
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const IconAdditionalStatus = styled(Icon)`   
  margin-left: 8px; 
`;


export const ButtonOperation = styled.button`    
  align-items: center;
  margin-right: 22px;
  font-family: ${FONTS.Helvetica};
`;
