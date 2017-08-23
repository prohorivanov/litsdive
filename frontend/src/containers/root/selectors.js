import { createSelector } from 'reselect'
import { Map } from 'immutable'
const menuSelector = state => state.getIn(['rootReducer', 'menu'])
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

export const selectors = state => ({
  profile: state.get('profile'),
  contacts: contactsSelector(state),
  menu: mergeMenuWithContactsSocials(state)
})
