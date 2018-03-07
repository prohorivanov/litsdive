import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { List } from 'immutable'
import { connect } from 'react-redux'
import * as ContactsAction from 'dal/contacts/actions'
import mapStateToProps from './selectors'
import MenuItem from './menu/menu-item'
import {
  FooterBlock,
  MenuFooter
} from './style.js'

class Footer extends Component {
  static propTypes = {
    menu: PropTypes.instanceOf(List).isRequired
  }

  componentDidMount () {

  }
  render () {
    const {menu} = this.props
    return ReactDOM.createPortal(
      (
        <FooterBlock>
          <MenuFooter>
            {menu.map((menuItem, i) => (
              <MenuItem key={i} {...menuItem.toJS()} />
            ))}
          </MenuFooter>
          {/* <div>
          <MapEmbed dangerouslySetInnerHTML={{__html: contacts.get('mapEmbed')}}/>
        </div> */}
        </FooterBlock>
      ),
      document.querySelector('#MAIN_FOOTER')
    )
  }
}

export default connect(mapStateToProps, ContactsAction)(Footer)
