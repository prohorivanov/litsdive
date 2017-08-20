import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { history } from 'app/app-history'
import { sendEvent } from 'app/google-analytics-util'

class MenuItem extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }

  to = (evt) => {
    evt.preventDefault()
    const {url, title} = this.props
    history.push(url)
    sendEvent('Menu', 'Click', title)
  }

  render () {
    const {url, title} = this.props
    return (
      <a href={url} onClick={this.to}>
        {title}
      </a>
    )
  }
}

export default MenuItem
