export const trackPage = (page) => {
  ga && ga('newTracker.send', { // eslint-disable-linecd
    'hitType': 'pageview',
    'page': page
  })
  ga && ga('oldTracker.send', { // eslint-disable-line
    'hitType': 'pageview',
    'page': page
  })
}

/**
 *
 * @param eventCategory
 * @param eventAction
 * @param eventLabel
 */
export const sendEvent = (eventCategory, eventAction, eventLabel) => {
  ga && ga('send', 'event', { // eslint-disable-line
    'eventCategory': eventCategory,
    'eventAction': eventAction,
    'eventLabel': eventLabel
  })
}
