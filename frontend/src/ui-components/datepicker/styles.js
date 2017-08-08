import styled from 'styled-components';
import MaskedInput from 'ui-components/mask/react-input-mask';
import DatePicker from 'react-datepicker';
import Icon from 'ui-components/icon';

export const SiteDatePicker = styled.div`
  position: relative;   
  .react-datepicker-wrapper {
    display: block;
  }
  
  .react-datepicker {
    width: 298px;
  }
`;

export const StyledDatePicker = styled(DatePicker)`
  position: relative;
`;

export const IconCalendar = styled(Icon)`
  transform: translateY(-50%);
  transition: fill .2s;
  pointer-events: none;
  position: absolute;
  fill: #DADAD8;
  right: 5px;
  top: 50%;
  width: 15px !important;
  height: 15px !important;
`;


export const StyledCustomInput = styled.div`
  position: relative;  
`;

export const StyledMaskedInput = styled(MaskedInput)`
  width: 100% !important; 
`;
