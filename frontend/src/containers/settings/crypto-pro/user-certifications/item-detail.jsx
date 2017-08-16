import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { is } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment-timezone';
import OperationsButton from './operation-button';

import {
  STATUSES_LABEL,
  ADDITIONAL_STATUS_EXPIRING,
  ADDITIONAL_STATUS_NEW_REG_REGEN,
  ADDITIONAL_STATUS_REISSUE,
  ALLOW_SHOW_CERT_DETAIL,
  ALLOW_SHOW_REQUEST_DETAIL
} from '../constants';

import {
  Header,
  H2
} from '../../style.js';
import {
  Gray,
  Black,
  BodyDetail,
  HeaderStatusDetail,
  StatusLabelDetail,
  IconAdditionalStatus,
  FooterDetail,
  CertDetail,
  RequestDetail,
  DetailRequestToggler
} from './style';

import {
  ModalExtend,
  CollLabel,
  CollDescription,
  RowFlex,
  Info
} from '../style.js';

class CertItemDetail extends Component {

  static propTypes = {
    item: ImmutablePropTypes.contains({
      ulkName: PropTypes.string,
      orgName: PropTypes.string,
      requestId: PropTypes.string,
      certId: PropTypes.string,
      requestNumber: PropTypes.string,
      requestDate: PropTypes.string,
      dateBegin: PropTypes.string,
      dateEnd: PropTypes.string,

      mainStatus: PropTypes.string,
      additionalStatus: PropTypes.string,
      operDelete: PropTypes.string,
      operSign: PropTypes.string,
      operSend: PropTypes.string
    }).isRequired,
    closeModalItem: PropTypes.func.isRequired,
    onDeleteCert: PropTypes.func.isRequired,
    onRepeatCert: PropTypes.func.isRequired,
    onSendToBankCert: PropTypes.func.isRequired,
    onSignCertAction: PropTypes.func.isRequired,
  }

  state = {
    isShowDetail: false
  }

  shouldComponentUpdate(nextProps, nextState) {
    const item = !is(nextProps.item, this.props.item);
    const isShowDetail = nextState.isShowDetail !== this.state.isShowDetail;

    return item || isShowDetail;
  }

  toggleRequestDetail = () =>
    this.setState({ isShowDetail: !this.state.isShowDetail })

  render() {
    const {
      onDeleteCert,
      onRepeatCert,
      onSendToBankCert,
      onSignCertAction,
      closeModalItem,
      item
    } = this.props;

    const { isShowDetail } = this.state;

    // показываем CertDetail только для определенных статусов сертификата
    const isShowCertDetail = ALLOW_SHOW_CERT_DETAIL.includes(item.get('mainStatus'));
    const isShowRequestDetail = ALLOW_SHOW_REQUEST_DETAIL.includes(item.get('entityType'));

    return (
      <ModalExtend
        className="modal-create-cert"
        classNameContent="modal-create-cert-content"
        onClose={closeModalItem}
      >
        <Header>
          <H2>Сертификат</H2>
          <HeaderStatusDetail>
            <Gray>От:</Gray> <Black>{moment(item.get('requestDate')).format('DD.MM.YYYY')}</Black>
            <Gray> · Статус:</Gray>
            <StatusLabelDetail status={item.get('mainStatus')} additionalStatus={item.get('additionalStatus')}>
              {STATUSES_LABEL[item.get('mainStatus')]}
              {item.get('additionalStatus') === ADDITIONAL_STATUS_EXPIRING && (
                <IconAdditionalStatus type="clock" size="16" />
              )}
              {item.get('additionalStatus') === ADDITIONAL_STATUS_NEW_REG_REGEN && (
                <IconAdditionalStatus type="context-round" size="16" />
              )}
              {item.get('additionalStatus') === ADDITIONAL_STATUS_REISSUE && (
                <IconAdditionalStatus type="repeat" size="16" />
              )}
            </StatusLabelDetail>
          </HeaderStatusDetail>
        </Header>
        <BodyDetail>
          {item.get('importantMessage') && (
            <Info>{item.get('importantMessage')}</Info>
          )}
          {isShowCertDetail && (
            <CertDetail>
              <RowFlex>
                <CollLabel>Дата выпуска</CollLabel>
                {item.get('dateBegin') &&
                <CollDescription>{moment(item.get('dateBegin')).format('DD.MM.YYYY')}</CollDescription>
                }
              </RowFlex>
              <RowFlex>
                <CollLabel>Дата окончания</CollLabel>
                {item.get('dateEnd') &&
                <CollDescription>{moment(item.get('dateEnd')).format('DD.MM.YYYY')}</CollDescription>
                }
              </RowFlex>
              <RowFlex>
                <CollLabel>Серийный номер</CollLabel>
                <CollDescription>{item.get('certSerialNumber').toLocaleLowerCase()}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Издатель</CollLabel>
                <CollDescription>{item.get('certIssuer')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Средство подписи</CollLabel>
                <CollDescription>{item.get('certCryptoProfileName')}</CollDescription>
              </RowFlex>
            </CertDetail>
          )}

          {(isShowCertDetail && isShowRequestDetail) &&
            <DetailRequestToggler onClick={this.toggleRequestDetail}>
              {isShowDetail ? 'Скрыть' : 'Показать' } запрос
            </DetailRequestToggler>
          }

          {(!isShowCertDetail || isShowDetail) && (
            <RequestDetail>
              <RowFlex>
                <CollLabel>Номер запроса</CollLabel>
                <CollDescription>{item.get('requestNumber')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Дата запроса</CollLabel>
                <CollDescription>{moment(item.get('requestDate')).format('DD.MM.YYYY')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Уполномоченное лицо</CollLabel>
                <CollDescription>{item.get('ulkName')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Средство подписи</CollLabel>
                <CollDescription>{item.get('cpName')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Email</CollLabel>
                <CollDescription>{item.get('email')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Город</CollLabel>
                <CollDescription>{item.get('city')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Страна</CollLabel>
                <CollDescription>{item.get('country')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Организация</CollLabel>
                <CollDescription>{item.get('orgName')}</CollDescription>
              </RowFlex>
              <RowFlex>
                <CollLabel>Подразделение</CollLabel>
                <CollDescription>{item.get('departament')}</CollDescription>
              </RowFlex>
            </RequestDetail>
          )}
        </BodyDetail>
        <FooterDetail>
          <OperationsButton
            operations={item.get('operations')}
            onDeleteCert={onDeleteCert}
            onRepeatCert={onRepeatCert}
            onSendToBankCert={onSendToBankCert}
            onSignCertAction={onSignCertAction}
          />
        </FooterDetail>
      </ModalExtend>
    );
  }
}

export default CertItemDetail;

