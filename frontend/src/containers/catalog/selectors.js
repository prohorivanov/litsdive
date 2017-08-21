import { REDUCER_NAME } from './constants'
import { createSelector } from 'reselect'

const productsListSelector = state => state.getIn([REDUCER_NAME, 'catalogList'])
const loaderSelector = state => state.getIn([REDUCER_NAME, 'loader'])
const tagsListSelector = state => state.getIn([REDUCER_NAME, 'tagsList'])


export const prepareTagsListForReactSelect = createSelector(
  tagsListSelector,
  tagsList => tagsList.map(t =>
    t
      .set('value', t.get('_id'))
      .set('label', t.get('name'))
  )
)

export const selectIndexContainer = state => ({
  catalogList: productsListSelector(state),
  tagsList: prepareTagsListForReactSelect(state),
  loader: loaderSelector(state)
})
