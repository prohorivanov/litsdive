import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  TattooImage,
  Figure,
  AuthorName,
  TattooImageDetail,
  ModalExtend
} from './style.js'

class GalleryItem extends PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorId: PropTypes.string
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
    const {
      url,
      authorName,
      authorId
    } = this.props
    const {isShowModalTattoo} = this.state
    return (
      <Figure>
        <AuthorName href={`/masters/${authorId}`}>{authorName}</AuthorName>
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
