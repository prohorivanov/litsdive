import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import Loader from 'ui-components/loader'
import * as usersAction from 'dal/users/actions'
import * as newsAction from 'dal/news/actions'
import Gallery from './gallery'
import * as LocalAction from './actions'
import { selectIndexContainer } from './selectors'
import { MatersLayout, MainColl, AuthorName } from './style.js'

export class IndexLayout extends Component {
  static propTypes = {
    userLoader: PropTypes.bool,
    loaderDetail: PropTypes.bool,
    galleriesWithAuthor: PropTypes.instanceOf(List).isRequired,
    userList: PropTypes.instanceOf(List).isRequired,
    galleryDetail: PropTypes.instanceOf(Map).isRequired,
    getAllGalleryAction: PropTypes.func.isRequired,
    getAuthorsAction: PropTypes.func.isRequired,
    findGalleryByAuthorIDAction: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }

  componentDidMount () {
    const {
      getAllGalleryAction,
      getAuthorsAction,
      findGalleryByAuthorIDAction,
      galleriesWithAuthor,
      params: {id}
    } = this.props

    // получаем всех узеров
    // получаем все галереи
    if (!galleriesWithAuthor.size) {
      getAuthorsAction()
      getAllGalleryAction()
    }

    // получаем галерею по id пользователя
    // в этом же запросе получаем детальную информацию по узеру
    if (id) {
      findGalleryByAuthorIDAction(id)
    }
  }

  componentWillReceiveProps (nextProps) {
    const {params: {id}, findGalleryByAuthorIDAction} = this.props
    const nextID = nextProps.params.id
    if (nextID && nextID !== id) {
      findGalleryByAuthorIDAction(id)
    }
  }

  render () {
    const {
      userLoader,
      loaderDetail,
      galleryDetail,
      userList,
      galleriesWithAuthor,
      params: {
        id
      }
    } = this.props

    console.log(galleriesWithAuthor.toJS(), 'galleriesWithAuthor')
    return (
      <MatersLayout>
        <MainColl>
          {(userLoader || loaderDetail) && <Loader centered/>}

          {(!userList.size) ? null : (
            <div>
              <AuthorName to='masters'>Все</AuthorName>
              {userList.map(user => (
                <AuthorName key={user.get('_id')} to={`/masters/${user.get('_id')}`}>
                  <span>{user.getIn(['name', 'first'])}</span>
                  {' '}
                  <span>{user.getIn(['name', 'last'])}</span>
                </AuthorName>
              ))}
            </div>
          )}

          {(!galleriesWithAuthor.size || id) ? null : (
            <Gallery galleries={galleriesWithAuthor}/>
          )}
          {(!galleryDetail.size || !id) ? null : (
            <Gallery galleries={galleryDetail}/>
          )}
        </MainColl>
      </MatersLayout>
    )
  }
}

export default connect(
  selectIndexContainer,
  {
    ...usersAction,
    ...newsAction,
    ...LocalAction
  }
)(IndexLayout)
