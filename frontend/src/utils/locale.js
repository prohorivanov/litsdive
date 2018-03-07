import translations from '../locales'

export const localeSelector = state => state.getIn(['profile', 'locale'])

/**
 * используем в createSelector и в сагах select
 * @param state
 * @returns {function(*): *}
 */
export const formatLocaleIntlSelector = (state) => {
  const locale = state.getIn(['profile', 'locale'])
  return message => (
    translations[locale] && translations[locale][message]
      ? translations[locale][message]
      : message
  )
}
