import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as ProfileAction       from 'dal/profile/actions';
import { connect }              from 'react-redux';
import * as LocalAction         from './actions';
import { mapStateToProps }      from './selectors';
import NewCert      from './new-cert';
import CertList     from './user-certifications/list';
import Filters      from './filters';
import {
  Layout,
  ModalExtend
} from './style.js';

class CryptoProSettings extends Component {

  static propTypes = {
    resetFormCertAction: PropTypes.func
  }

  state = {
    showModal: false
  }

  onHandleCreateCert = () => {
    this.setState({ showModal: true });
  }

  onCloseModal = () => {
    const { resetFormCertAction } = this.props;
    this.setState({
      showModal: false
    }, resetFormCertAction);
  }
  
  render() {
    const { showModal } = this.state;
    return (
      <Layout>
        <Filters
          onHandleCreateCert={this.onHandleCreateCert}
        />

        <CertList />

        {showModal &&
        <ModalExtend
          stopClose
          className="modal-create-cert"
          classNameContent="modal-create-cert-content"
          onClose={this.onCloseModal}
        >
          <NewCert {...this.props} />
        </ModalExtend>
        }
      </Layout>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    ...LocalAction,
    ...ProfileAction
  }
)(CryptoProSettings);

