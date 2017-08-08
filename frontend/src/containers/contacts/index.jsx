import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import * as LocalAction from './actions';
import { selectIndexContainer } from './selectors';
import { MatersLayout, MainColl, Contacts } from './style.js';

export class ContactsLayout extends Component {

  static propTypes = {
    contacts: PropTypes.instanceOf(List).isRequired,
    getContactsAction: PropTypes.func.isRequired
  }

  state = {
    showSettings: false
  }

  componentDidMount() {
    const { getContactsAction } = this.props;
    getContactsAction();
  }

  render() {
    const { contacts } = this.props;
    return (
      <MatersLayout>
        <MainColl>
          <Contacts>
            {contacts.map(con => (
              <div key={con.get('id')}>
                <div dangerouslySetInnerHTML={{ __html: con.get('description') }} />
              </div>
            ))}
          </Contacts>
          <iFrame
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2243.595204394514!2d37.728046315956256!3d55.78290198056138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b535150a7d4957%3A0xee454a6ab48c3da5!2sul.+Shcherbakovskaya%2C+35%2C+Moskva%2C+105318!5e0!3m2!1sen!2sru!4v1501872291592"
            width="80%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
          />
        </MainColl>
      </MatersLayout>
    );
  }
}

export default connect(
  selectIndexContainer,
  {
    ...LocalAction
  }
)(ContactsLayout);
