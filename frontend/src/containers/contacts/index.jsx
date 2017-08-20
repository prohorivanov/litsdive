import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import * as ContactsAction from 'dal/contacts/actions'
import { selectIndexContainer } from './selectors'
import { trackPage } from 'app/google-analytics-util'
import {
  MatersLayout,
  MainColl,
  Contacts,
  MapEmbed
} from './style.js'

export class ContactsLayout extends Component {
  static propTypes = {
    contacts: PropTypes.instanceOf(Map).isRequired,
    getContactsAction: PropTypes.func.isRequired
  }

  state = {
    showSettings: false
  }

  componentDidMount () {
    const {getContactsAction} = this.props
    getContactsAction()
    trackPage('/contacts')
  }

  render () {
    const {contacts} = this.props
    return (
      <MatersLayout>
        <MainColl>
          <Contacts>
            <div dangerouslySetInnerHTML={{__html: contacts.get('content')}}/>
            <MapEmbed dangerouslySetInnerHTML={{__html: contacts.get('mapEmbed')}}/>
          </Contacts>
        </MainColl>
      </MatersLayout>
    )
  }
}

export default connect(
  selectIndexContainer,
  {
    ...ContactsAction
  }
)(ContactsLayout)
