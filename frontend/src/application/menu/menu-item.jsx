import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { sendEvent } from 'app/google-analytics-util'

class MenuItem extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    push: PropTypes.func
  }

  to = (evt) => {
    const { push } = this.props
    evt.preventDefault()
    const {url, title} = this.props
    if (url.includes('http') || url.includes('https') || url.includes('www')) {
      window.open(url, '_blank')
      return
    }
    push(url)
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
