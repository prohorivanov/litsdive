const contactsSelector = state => state.getIn(['contacts', 'contacts'])

export const selectIndexContainer = state => ({
  contacts: contactsSelector(state)
})
