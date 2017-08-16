import { Component, PropTypes } from 'react'
import { MatchMediaRegister } from 'dal/match-media/actions'

class RootWrapperLayout extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element
    ])
  }

  static childContextTypes = {
    changeClassName: PropTypes.func
  }

  constructor () {
    super()
    MatchMediaRegister()
  }

  render () {
    return (
      this.props.children
    )
  }
}

export default RootWrapperLayout
