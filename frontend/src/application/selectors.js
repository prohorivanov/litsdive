import { createSelector } from 'reselect'
import { Map } from 'immutable'
const menuSelector = state => state.getIn(['rootReducer', 'menu'])
const applicationLocaleSelector = state => state.getIn(['application', 'locale']);
const contactsSelector = state => state.getIn(['contacts', 'contacts'])

export const mergeMenuWithContactsSocials = createSelector(
  menuSelector,
  contactsSelector,
  (menu, contacts) => {
    let cloneMenu = menu
    if (contacts.get('socials').size &&
      (contacts.getIn(['socials', 'vk']) || contacts.getIn(['socials', 'fb']))) {
      contacts.get('socials').forEach((url, title) => {
        if (url) {
          cloneMenu = cloneMenu.push(Map({
            url,
            title
          }))
        }
      })
      return cloneMenu
    }
    return menu
  }
)

const mapStateToProps = state => ({
  profile: state.get('profile'),
  applicationLocale: applicationLocaleSelector(state),
  contacts: contactsSelector(state),
  menu: mergeMenuWithContactsSocials(state)
})

export default mapStateToProps
