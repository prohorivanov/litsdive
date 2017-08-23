import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  ProductImage,
  Figure,
  Description,
  ProductTitle,
  ProductPrice,
  TattooImageDetail,
  ModalExtend
} from './style.js'

class GalleryItem extends PureComponent {
  static propTypes = {
    image: PropTypes.shape({
      url: PropTypes.string.isRequired
    }),
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
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
      _id,
      slug,
      title,
      price,
      image: {url}
    } = this.props
    const {isShowModalTattoo} = this.state
    return (
      <Figure>
        <ProductImage src={url} onClick={this.onShowDetailTattoo}/>
        <Description>
          <ProductTitle>{title}</ProductTitle>
          <ProductPrice>{price} rub.</ProductPrice>
        </Description>

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
