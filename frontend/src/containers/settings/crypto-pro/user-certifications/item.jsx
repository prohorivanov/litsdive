import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { is } from 'immutable';
import moment from 'moment-timezone';
import {
  STATUSES_LABEL,
  ADDITIONAL_STATUS_EXPIRING,
  ADDITIONAL_STATUS_NEW_REG_REGEN,
  ADDITIONAL_STATUS_REISSUE
} from '../constants';

import OperationsIcon from './operation-icon';
import CertItemDetail from './item-detail';

import {
  Item,
  ItemInner,
  CollItemLeft,
  CollItemRight,
  StatusLabel,
  ItemBorder,
  DateItem,
  Name,
  NameTitle,
  CompanyLabel,
  CompanyName,
  IconUser,
  IconAdditionalStatus,
} from './style.js';

class CertItem extends Component {
  
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
    deleteCertAction: PropTypes.func.isRequired,
    repeatCertAction: PropTypes.func.isRequired,
    sendToBankCertAction: PropTypes.func.isRequired,
    signCertAction: PropTypes.func.isRequired,
  }

  state = {
    isMouseEnter: false,
    showDetail: false,
  }

  shouldComponentUpdate(nextProps, nextState) {
    const item = !is(nextProps.item, this.props.item);
    const isMouseEnter = nextState.isMouseEnter !== this.state.isMouseEnter;
    const showDetail = nextState.showDetail !== this.state.showDetail;
    return item || isMouseEnter || showDetail;
  }

  onMouseEnter = () => {
    this.setState({ isMouseEnter: true });
  }


  onMouseLeave = () => {
    this.setState({ isMouseEnter: false });
  }

  onDeleteCert = () => {
    const { deleteCertAction, item } = this.props;
    deleteCertAction(item.get('requestId'));
  }

  onDeleteCertFromDetail = () => {
    const { deleteCertAction, item } = this.props;
    deleteCertAction(item.get('requestId'));
    this.onCloseDetail();
  }

  onRepeatCert = () => {
    const { repeatCertAction, item } = this.props;
    repeatCertAction(item.get('requestId'));
  }

  onSendToBankCert = () => {
    const { sendToBankCertAction, item } = this.props;
    sendToBankCertAction(item.get('requestId'));
  }

  onSignCertAction = () => {
    const { signCertAction, item } = this.props;
    signCertAction(item.get('requestId'));
  }

  onShowDetail = () => {
    this.setState({ showDetail: true });
  }

  onCloseDetail = () => {
    this.setState({ showDetail: false });
  }
  
  render() {
    const { item } = this.props;
    const { isMouseEnter, showDetail } = this.state;
    return (
      <Item onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <ItemInner isMouseEnter={isMouseEnter} onClick={this.onShowDetail}>
          <ItemBorder status={item.get('mainStatus')} additionalStatus={item.get('additionalStatus')} />
          <CollItemLeft>
            <Name>
              <IconUser type="user" size="20" />
              <NameTitle>
                {item.get('ulkName')}
              </NameTitle>
            </Name>
            <CompanyName>
              <CompanyLabel>Компания:</CompanyLabel> {item.get('orgName')}
            </CompanyName>
          </CollItemLeft>
          <CollItemRight>
            <StatusLabel
              status={item.get('mainStatus')}
              additionalStatus={item.get('additionalStatus')}
              entityType={item.get('entityType')}
            >
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
            </StatusLabel>
            {item.get('certId') && (
              <div>
                <DateItem>Дата выпуска: {moment(item.get('dateBegin')).format('DD.MM.YYYY')}</DateItem>
                <DateItem>Дата окончания: {moment(item.get('dateEnd')).format('DD.MM.YYYY')}</DateItem>
              </div>
            )}
            {!item.get('certId') && (
              <DateItem>Дата запроса: {moment(item.get('requestDate')).format('DD.MM.YYYY')}</DateItem>
            )}
          </CollItemRight>
        </ItemInner>
        <OperationsIcon
          operations={item.get('operations')}
          isMouseEnter={isMouseEnter}
          onDeleteCert={this.onDeleteCert}
          onRepeatCert={this.onRepeatCert}
          onSendToBankCert={this.onSendToBankCert}
          onSignCertAction={this.onSignCertAction}
        />

        {showDetail && (
          <CertItemDetail
            item={item}
            onDeleteCert={this.onDeleteCertFromDetail}
            onRepeatCert={this.onRepeatCert}
            onSendToBankCert={this.onSendToBankCert}
            onSignCertAction={this.onSignCertAction}
            closeModalItem={this.onCloseDetail}
          />
        )}
      </Item>
    );
  }
}

export default CertItem;

