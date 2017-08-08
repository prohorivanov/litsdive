import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'ui-components/modal';
import {
  Figure,
  TattooImage,
  TattooImageDetail
} from './style.js';

class GalleryItem  extends PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired
  }

  state = {
    isShowModalTattoo: false
  }

  onShowDetailTattoo = () => {
    this.setState({ isShowModalTattoo: true });
  }

  onCloseModalTattoo = () => {
    this.setState({ isShowModalTattoo: false });
  }

  render() {
    const { src } = this.props;
    const { isShowModalTattoo } = this.state;
    return (
      <Figure>
        <TattooImage src={src} onClick={this.onShowDetailTattoo} />
        {isShowModalTattoo && (
          <Modal onClose={this.onCloseModalTattoo}>
            <TattooImageDetail src={src} />
          </Modal>
        )}
      </Figure>
    );
  }
}

export default GalleryItem;
