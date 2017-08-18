import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Map } from 'immutable'
import { connect } from 'react-redux'
import * as ContactsAction from 'dal/contacts/actions'
import { selectors } from './selectors'
import MenuItem from './menu/menu-item'
import {
  FooterBlock,
  MapEmbed,
  MenuFooter
} from './style.js'

class Footer extends Component {
  static propTypes = {
    menu: PropTypes.instanceOf(List).isRequired,
    contacts: PropTypes.instanceOf(Map).isRequired,
    getContactsAction: PropTypes.func.isRequired
  }

  componentDidMount () {
    const {getContactsAction} = this.props
    getContactsAction()
  }

  render () {
    const {menu, contacts} = this.props
    return (
      <FooterBlock>
        <MenuFooter>
          {menu.map((menuItem, i) => (
            <MenuItem key={i} {...menuItem.toJS()} />
          ))}
        </MenuFooter>
        <div>
          <MapEmbed dangerouslySetInnerHTML={{__html: contacts.get('mapEmbed')}}/>
        </div>
      </FooterBlock>
    )
  }
}

export default connect(
  selectors,
  {
    ...ContactsAction
  }
)(Footer)
