import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { reduxForm } from 'redux-form/immutable';
import {
  FORM_NAME_NEW_CERT,
} from '../constants';

import StepForm from './step-form';
import StepPrint from './step-print';

class NewCert extends Component {
  
  static propTypes = {
    ulcValues: PropTypes.instanceOf(List),
    cpsValues: PropTypes.instanceOf(List),
    error: PropTypes.string,
    submittingForm: PropTypes.bool,
    getValuesUlkAction: PropTypes.func,
    createNewCertAction: PropTypes.func,
    changeUlkAction: PropTypes.func,
    createdNewCertData: PropTypes.instanceOf(Map),
    newCertStatuses: ImmutablePropTypes.contains({
      cryptoPluginWork: PropTypes.bool,
      sendToBank: PropTypes.bool
    }),
    createPKCS10Result: ImmutablePropTypes.contains({
      pkcs10: PropTypes.string,
      containerName: PropTypes.string
    }),
    sendToBankNewCertAction: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { getValuesUlkAction } = this.props;
    getValuesUlkAction();
  }
  
  /**
   *
   * @param evt
   * @private
   */
  handleSubmit = (evt) => {
    evt.preventDefault();
    const { createNewCertAction } = this.props;
    createNewCertAction();
  };

  handlePrint = () => {
    // console.log('print');
  }

  handleSend = () => {
    const { sendToBankNewCertAction, createdNewCertData, createPKCS10Result } = this.props;
    sendToBankNewCertAction({
      dataNewCert: createdNewCertData,
      createPKCS10Result
    });
  }

  render() {
    const {
      newCertStatuses,
      createdNewCertData,
      ulcValues,
      cpsValues,
      submittingForm,
      changeUlkAction,
      createPKCS10Result,
      error,
      ...rest
    } = this.props;

    return (
      <div>
        {!newCertStatuses.get('cryptoPluginWork') && (
          <StepForm
            {...rest}
            error={error}
            changeUlkAction={changeUlkAction}
            ulcValues={ulcValues}
            cpsValues={cpsValues}
            newCertStatuses={newCertStatuses}
            submittingForm={submittingForm}
            handleSubmit={this.handleSubmit}
          />
        )}
        {newCertStatuses.get('cryptoPluginWork') && (
          <StepPrint
            newCertStatuses={newCertStatuses}
            createdNewCertData={createdNewCertData}
            createPKCS10Result={createPKCS10Result}
            handlePrint={this.handlePrint}
            handleSend={this.handleSend}
          />
        )}
      </div>
    );
  }
}


export default reduxForm({
  form: FORM_NAME_NEW_CERT
})(NewCert);

