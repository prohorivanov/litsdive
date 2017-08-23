import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { List, Map } from 'immutable'
import Loader from 'ui-components/loader'
import * as usersAction from 'dal/users/actions'
import Gallery from './gallery'
import * as LocalAction from './actions'
import { selectIndexContainer } from './selectors'
import { trackPage, sendEvent } from 'app/google-analytics-util'
import { history } from 'app/app-history'
import {
  MatersLayout,
  MainColl,
  Head,
  SelectExtended
} from './style.js'

export class IndexLayout extends Component {
  static propTypes = {
    userLoader: PropTypes.bool,
    loaderDetail: PropTypes.bool,
    activeUser: PropTypes.object,
    galleriesWithAuthor: PropTypes.instanceOf(List).isRequired,
    userList: PropTypes.instanceOf(List).isRequired,
    galleryDetail: PropTypes.instanceOf(Map).isRequired,
    getAllGalleryAction: PropTypes.func.isRequired,
    getAuthorsAction: PropTypes.func.isRequired,
    findGalleryByAuthorIDAction: PropTypes.func.isRequired,
    clearGalleryDetailAction: PropTypes.func.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }

  state = {
    valueSelectAuthor: null
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

    trackPage('/masters')
  }

  componentWillReceiveProps (nextProps) {
    const {params: {id}, findGalleryByAuthorIDAction} = this.props
    const nextID = nextProps.params.id
    if (nextID && nextID !== id) {
      findGalleryByAuthorIDAction(nextID)
    }
  }

  onChangeAuthor = (value) => {
    const { clearGalleryDetailAction } = this.props
    history.push(`/masters/${value ? value._id : ''}`)
    sendEvent('Choose master', 'Change', value && value.title)
    if (!value) {
      clearGalleryDetailAction()
    }
  }

  render () {
    const {
      userLoader,
      loaderDetail,
      galleryDetail,
      userList,
      galleriesWithAuthor,
      activeUser,
      params: {
        id
      }
    } = this.props
    return (
      <MatersLayout>
        <MainColl>
          <Head>
            <h3>Работы наших мастеров</h3>
            {(!userList.size) ? null : (
              <SelectExtended
                value={activeUser}
                options={userList.toJS()}
                onChange={this.onChangeAuthor}
                placeholder='выбрать мастера'
              />
            )}
          </Head>

          {(userLoader || loaderDetail) && <Loader centered/>}

          {(!galleriesWithAuthor.size || id) ? null : (
            <Gallery galleries={galleriesWithAuthor}/>
          )}
          {(!galleryDetail.size || !id) ? null : (
            <Gallery galleries={List([galleryDetail])}/>
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
    ...LocalAction
  }
)(IndexLayout)
