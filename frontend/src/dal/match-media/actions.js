import store from 'app/store'
import { MEDIA_SIZES } from 'styles/style-vars.js'

export const CHANGE_MEDIA_QUERY = 'CHANGE_MEDIA_QUERY'
export const FIRST_CALL_QUERY = 'FIRST_CALL_QUERY'

const matchMediaListPoint = [
  {
    media: window.matchMedia(`(min-width: ${MEDIA_SIZES.size1250})`),
    point: 1250,
    distance: 'min'
  },
  {
    media: window.matchMedia(`(max-width: ${MEDIA_SIZES.size1250})`),
    point: 1250,
    distance: 'max'
  },
  {
    media: window.matchMedia(`(min-width: ${MEDIA_SIZES.size1024})`),
    point: 1024,
    distance: 'min'
  },
  {
    media: window.matchMedia(`(max-width: ${MEDIA_SIZES.size1024})`),
    point: 1024,
    distance: 'max'
  },
  {
    media: window.matchMedia(`(min-width: ${MEDIA_SIZES.lgsize})`),
    point: 945,
    distance: 'min'
  },
  {
    media: window.matchMedia(`(max-width: ${MEDIA_SIZES.lgsize})`),
    point: 945,
    distance: 'max'
  },
  {
    media: window.matchMedia(`(min-width: ${MEDIA_SIZES.mdsize})`),
    point: 768,
    distance: 'min'
  },
  {
    media: window.matchMedia(`(max-width: ${MEDIA_SIZES.mdsize})`),
    point: 768,
    distance: 'max'
  },

  {
    media: window.matchMedia(`(min-width: ${MEDIA_SIZES.xssize})`),
    point: 660,
    distance: 'min'
  },
  {
    media: window.matchMedia(`(max-width: ${MEDIA_SIZES.xssize})`),
    point: 660,
    distance: 'max'
  }
]

/**
 *
 * @param point
 * @param optPointStart
 * @returns {*}
 */
export function compareScreen (point, optPointStart) {
  const windowWidth = window.innerWidth
  if (optPointStart) {
    return optPointStart < point
  }
  return windowWidth && windowWidth <= point
}

/**
 * События matchMedia
 * конфиг matchMediaListPoint
 * прокидываем по проекту через store.dispatch
 *
 * Если не поддерживается matchMedia, то кидаем события
 * по точкам слушая resize
 * */
export function MatchMediaRegister () {
  if (window.matchMedia) {
    matchMediaListPoint.forEach((mq) => {
      const callback = () => {
        const dataMedia = {}
        dataMedia[mq.distance] = mq.point
        store.dispatch({
          type: CHANGE_MEDIA_QUERY,
          resolution: dataMedia,
          point: mq.point
        })
      }
      mq.media.addListener(callback)
    })
  }

  store.dispatch({
    type: FIRST_CALL_QUERY,
    resolution: Math.max(document.body.clientWidth, document.documentElement.clientWidth)
  })
}
