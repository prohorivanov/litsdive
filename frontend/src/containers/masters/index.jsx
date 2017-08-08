import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import Loader from 'ui-components/loader';
import * as masterAction from 'dal/masters/actions';
import * as newsAction from 'dal/news/actions';
import Gallery from './gallery';
import * as LocalAction from './actions';
import { selectIndexContainer } from './selectors';
import { MatersLayout, MainColl, AuthorName } from './style.js';

export class IndexLayout extends React.Component {

  static propTypes = {
    loaderMasters: PropTypes.bool,
    loaderDetail: PropTypes.bool,
    authors: PropTypes.instanceOf(List).isRequired,
    authorDetail: PropTypes.instanceOf(List).isRequired,
    getAuthorsAction: PropTypes.func.isRequired,
    getAuthorsByIdAction: PropTypes.func.isRequired,
    params: PropTypes.shape({
      authorSlug: PropTypes.string
    })
  }

  componentDidMount() {
    const {
      getAuthorsAction,
      getAuthorsByIdAction,
      authors,
      params: { authorSlug }
    } = this.props;
    if (!authors.size) {
      getAuthorsAction();
    }

    if (authorSlug) {
      getAuthorsByIdAction(authorSlug);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params: { authorSlug }, getAuthorsByIdAction } = this.props;
    const nextSlug = nextProps.params.authorSlug;
    if (nextSlug && nextSlug !== authorSlug) {
      getAuthorsByIdAction(nextSlug);
    }
  }

  render() {
    const {
      authors,
      loaderMasters,
      loaderDetail,
      authorDetail,
      params: {
        authorSlug
      }
    } = this.props;
    return (
      <MatersLayout>
        <MainColl>
          {(loaderMasters || loaderDetail) && <Loader centered />}

          {(!authors.size) ? null : (
            <div>
              <AuthorName to="masters">Все</AuthorName>
              {authors.map(master => (
                <AuthorName key={master.get('slug')} to={`/masters/${master.get('slug')}`}>
                  {master.get('name')}
                </AuthorName>
              ))}
            </div>
          )}

          {(!authors.size || authorSlug) ? null : (
            <Gallery authors={authors} />
          )}
          {(!authorDetail.size || !authorSlug) ? null : (
            <Gallery authors={authorDetail} />
          )}
        </MainColl>
      </MatersLayout>
    );
  }
}

export default connect(
  selectIndexContainer,
  {
    ...masterAction,
    ...newsAction,
    ...LocalAction
  }
)(IndexLayout);
