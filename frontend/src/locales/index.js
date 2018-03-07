import global from './locale/global.json'
import home from './locale/home.json'
import settings from './locale/settings.json'

export default {
  ru: {
    ...global.ru,
    ...home.ru,
    ...settings.ru
  },
  en: {
    ...global.en,
    ...home.en,
    ...settings.en
  }
}
