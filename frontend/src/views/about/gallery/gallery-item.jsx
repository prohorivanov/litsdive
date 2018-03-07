import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  TattooImage,
  Figure,
  TattooImageDetail,
  ModalExtend
} from './style.js'

class GalleryItem extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired
  }

  state = {
    isShowModalTattoo: false,
    isShowModalAuthor: false
  }

  onShowDetailTattoo = () => {
    this.setState({isShowModalTattoo: true})
  }

  onCloseModalTattoo = () => {
    this.setState({isShowModalTattoo: false})
  }

  render () {
    const {url} = this.props
    const {isShowModalTattoo} = this.state
    return (
      <Figure>
        <TattooImage src={url} onClick={this.onShowDetailTattoo}/>
        {isShowModalTattoo && (
          <ModalExtend onClose={this.onCloseModalTattoo}>
            <TattooImageDetail src={url}/>
          </ModalExtend>
        )}
      </Figure>
    )
  }
}

export default GalleryItem
