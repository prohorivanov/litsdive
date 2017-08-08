import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Modal from 'ui-components/modal';
import {
  TattooImage,
  Figure,
  AuthorName,
  AuthorDesc,
  AuthorInfo,
  AuthorPic,
  TattooImageDetail,
  AuthorDetail
} from './style.js';

class GalleryItem  extends PureComponent {

  static propTypes = {
    src: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorPhone: PropTypes.string,
    authorSocialLink: PropTypes.string,
    authorPhoto: PropTypes.string,
    authorSlug: PropTypes.string,
  }

  state = {
    isShowModalTattoo: false,
    isShowModalAuthor: false,
  }

  onShowDetailTattoo = () => {
    this.setState({ isShowModalTattoo: true });
  }

  onShowDetailAuthor = () => {
    this.setState({ isShowModalAuthor: true });
  }

  onCloseModalTattoo = () => {
    this.setState({ isShowModalTattoo: false });
  }

  onCloseModalAuthor = () => {
    this.setState({ isShowModalAuthor: false });
  }

  render() {
    const {
      src,
      authorName,
      authorPhone,
      authorSocialLink,
      authorPhoto,
      authorSlug
    } = this.props;
    const { isShowModalTattoo, isShowModalAuthor } = this.state;
    return (
      <Figure>
        <AuthorName onClick={this.onShowDetailAuthor}>{authorName}</AuthorName>
        <TattooImage src={src} onClick={this.onShowDetailTattoo} />

        {isShowModalTattoo && (
          <Modal onClose={this.onCloseModalTattoo}>
            <TattooImageDetail src={src} />
          </Modal>
        )}

        {isShowModalAuthor && (
          <Modal onClose={this.onCloseModalAuthor}>
            <AuthorInfo>
              <AuthorPic src={authorPhoto} />
              <AuthorDesc>
                <AuthorDetail>{authorName}</AuthorDetail>
                <AuthorDetail>{authorPhone}</AuthorDetail>
                <AuthorDetail>{authorSocialLink}</AuthorDetail>
                <AuthorDetail>
                  <a href={`masters/${authorSlug}`}>
                    Посмотреть все работы автора
                  </a>
                </AuthorDetail>
              </AuthorDesc>
            </AuthorInfo>
          </Modal>
        )}
      </Figure>
    );
  }
}

export default GalleryItem;
