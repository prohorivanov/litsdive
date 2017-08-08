import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, is } from 'immutable';
import { Loader } from 'ui-components/loader';
import {
  getCertListAction,
  deleteCertAction,
  repeatCertAction,
  sendToBankCertAction,
  signCertAction
} from '../actions';
import { mapStateToProps } from '../selectors';
import CertItem from './item';
import {
  ListBlock
} from './style.js';

class CertList extends Component {
  
  static propTypes = {
    certListFiltered: PropTypes.instanceOf(List),
    loadCertListLoad: PropTypes.bool,
    getCertListAction: PropTypes.func,
    deleteCertAction: PropTypes.func,
    repeatCertAction: PropTypes.func,
    sendToBankCertAction: PropTypes.func,
    signCertAction: PropTypes.func,
  }

  componentDidMount() {
    this.props.getCertListAction();
  }

  shouldComponentUpdate(nextProps) {
    return !is(nextProps.certListFiltered, this.props.certListFiltered);
  }
  
  render() {
    const {
      certListFiltered,
      loadCertListLoad
    } = this.props;

    return (
      <ListBlock>
        {loadCertListLoad && <Loader center />}
        {certListFiltered.map((item, i) =>
          <CertItem
            item={item}
            key={i}
            deleteCertAction={this.props.deleteCertAction}
            repeatCertAction={this.props.repeatCertAction}
            sendToBankCertAction={this.props.sendToBankCertAction}
            signCertAction={this.props.signCertAction}
          />
        )}
      </ListBlock>
    );
  }
}


export default connect(
  mapStateToProps,
  {
    getCertListAction,
    deleteCertAction,
    repeatCertAction,
    sendToBankCertAction,
    signCertAction
  }
)(CertList);

