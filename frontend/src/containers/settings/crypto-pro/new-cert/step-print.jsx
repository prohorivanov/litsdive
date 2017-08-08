import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment-timezone';
import {
  Gray,
  Black,
  Body,
  Footer,
  IconForButton,
  ButtonExtend,
  ButtonWithIconPrint
} from './style.js';

import {
  Header,
  H2
} from '../../style.js';

import {
  CollLabel,
  CollDescription,
  RowFlex,
  Info,
  DirectionColumn
} from '../style.js';

const StepPrint = ({ createdNewCertData, newCertStatuses, handlePrint, handleSend }) => {
  const {
    Country,
    OrgName,
    Dep,
    Email,
    City,
    SignerName,
    UlkName,
    certState
  } = createdNewCertData.toJS();

  return (
    <div>
      <Header>
        <H2> Сертификат </H2>
        <div>
          <Gray>От:</Gray> <Black>{moment().format('DD.MM.YYYY')}</Black>
          <Gray> · Статус:</Gray> <Black>{certState}</Black>
        </div>
      </Header>
      <Body>
        {newCertStatuses.get('sendToBank') && (
          <Info>
            Запрос отправлен. Распечатайте его, заверьте печатью и подписью и предоставьте в отделение банка.
            После предъявления бумажного экземпляра сертификат будет активирован в течении рабочего дня.
          </Info>
        )}

        {!newCertStatuses.get('sendToBank') && (
          <Info>Запрос создан, необходимо отправить его в банк.</Info>
        )}

        <DirectionColumn>
          <RowFlex>
            <CollLabel>Уполномоченное лицо</CollLabel>
            <CollDescription>{UlkName}</CollDescription>
          </RowFlex>
          <RowFlex>
            <CollLabel>Средство подписи</CollLabel>
            <CollDescription>{SignerName}</CollDescription>
          </RowFlex>
          <RowFlex>
            <CollLabel>Email</CollLabel>
            <CollDescription>{Email}</CollDescription>
          </RowFlex>
          <RowFlex>
            <CollLabel>Город</CollLabel>
            <CollDescription>{City}</CollDescription>
          </RowFlex>
          <RowFlex>
            <CollLabel>Страна</CollLabel>
            <CollDescription>{Country}</CollDescription>
          </RowFlex>
          <RowFlex>
            <CollLabel>Организация</CollLabel>
            <CollDescription>{OrgName}</CollDescription>
          </RowFlex>
          <RowFlex>
            <CollLabel>Подразделение</CollLabel>
            <CollDescription>{Dep}</CollDescription>
          </RowFlex>
        </DirectionColumn>
      </Body>
      <Footer>
        {newCertStatuses.get('cryptoPluginWork') && newCertStatuses.get('sendToBank') && (
          <ButtonWithIconPrint
            primary
            size="large"
            className="button"
            data-loc="printNewCertSubmit"
            onClick={handlePrint}
          >
            <IconForButton
              type="print"
              size="16"
              title="Распечатать"
              onClick={handlePrint}
            />
            Распечатать
          </ButtonWithIconPrint>
        )}

        {newCertStatuses.get('cryptoPluginWork') && !newCertStatuses.get('sendToBank') &&  (
          <ButtonExtend
            primary
            size="large"
            data-loc="sendNewCertSubmit"
            onClick={handleSend}
          >
            Отправить в банк
          </ButtonExtend>
        )}
      </Footer>
    </div>
  );
};

StepPrint.propTypes = {
  newCertStatuses: ImmutablePropTypes.contains({
    cryptoPluginWork: PropTypes.bool,
    sendToBank: PropTypes.bool
  }),
  createdNewCertData: ImmutablePropTypes.contains({
    SignerName: PropTypes.string,
    UlkName: PropTypes.string,
    Country: PropTypes.string,
    OrgName: PropTypes.string,
    Dep: PropTypes.string,
    Email: PropTypes.string,
    City: PropTypes.string
  }),
  handlePrint: PropTypes.func,
  handleSend: PropTypes.func,
};

export default StepPrint;

