import { LOCAL_REDUCER } from './constants'
import { createSelector } from 'reselect'

const catalogListSelector = state => state.getIn([LOCAL_REDUCER, 'catalogList'])
const loaderSelector = state => state.getIn([LOCAL_REDUCER, 'loader'])
const tagsListSelector = state => state.getIn([LOCAL_REDUCER, 'tagsList'])

export const prepareTagsListForReactSelect = createSelector(
  tagsListSelector,
  tagsList => tagsList.map(t =>
    t
      .set('value', t.get('_id'))
      .set('label', t.get('name'))
  )
)

const mapStateToProps = state => ({
  catalogList: catalogListSelector(state),
  tagsList: prepareTagsListForReactSelect(state),
  loader: loaderSelector(state)
})

export default mapStateToProps
