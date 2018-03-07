const contactsSelector = state => state.getIn(['contacts', 'contacts'])

export const mapStateToProps = state => ({
  contacts: contactsSelector(state)
})

export default mapStateToProps
