import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Map } from 'immutable'
import { trackPage } from 'app/google-analytics-util'
import {
  MatersLayout,
  MainColl,
  Contacts,
  MapEmbed
} from './style.js'

export class Layout extends Component {
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

export default Layout
