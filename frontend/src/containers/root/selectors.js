const menuSelector = state => state.getIn(['rootReducer', 'menu'])
const contactsSelector = state => state.getIn(['contacts', 'contacts'])

export const selectors = state => ({
  profile: state.get('profile'),
  contacts: contactsSelector(state),
  menu: menuSelector(state)
})
