import { REDUCER_NAME } from './constants'

const contactsSelector = state => state.getIn([REDUCER_NAME, 'contacts'])

export const selectIndexContainer = state => ({
  contacts: contactsSelector(state)
})
