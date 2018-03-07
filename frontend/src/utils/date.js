import moment from 'moment-timezone'

/**
 * @todo deprecated
 * используем в app.js
 * import moment  from 'moment-timezone';
 * moment.tz.setDefault('Europe/Moscow');
 * @type {string}
 */
export const MOSCOW_UTC_OFFSET = '+03:00'
export const DATE_FORMAT = 'YYYY-MM-DD'
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const TIME_FORMAT = 'HH:mm:ss'
export const SUPPORT_WORK_FROM = '03:00:00'
export const SUPPORT_WORK_TO = '19:00:00'

export function DateTimeUTC () {
  return moment().utcOffset(MOSCOW_UTC_OFFSET)
}

export function momentInCurrentUtcOffset () {
  const momentInst = moment().utcOffset(MOSCOW_UTC_OFFSET)
  return moment.parseZone(`${momentInst.format(DATE_FORMAT)}T00:00:00${MOSCOW_UTC_OFFSET}`)
}

/**
 *
 * @param {Moment} date
 */
export function resetDateTime (date) {
  return moment.parseZone(`${date.format(DATE_FORMAT)}T00:00:00${MOSCOW_UTC_OFFSET}`)
}

export function momentInCurrentUtcOffsetT () {
  const momentInst = moment().utcOffset(MOSCOW_UTC_OFFSET)
  return moment.parseZone(`${momentInst.format(DATE_TIME_FORMAT)}`)
}

/**
 * Отдает дату последнего операционного дня
 * @return {string} ISO time format
 */
export function getLastOperationDay () {
  const SUNDAY = 0
  const lastOperationDay = moment().subtract(1, 'days')
  if (lastOperationDay.day() === SUNDAY) {
    lastOperationDay.subtract(1, 'days')
  }

  return lastOperationDay
}

/**
 *
 */
export function isSupportWorkingHours () {
  const currentMoscowDayTime = DateTimeUTC(TIME_FORMAT)

  const isWorkingTime = currentMoscowDayTime.isBetween(
    moment(SUPPORT_WORK_FROM, TIME_FORMAT),
    moment(SUPPORT_WORK_TO, TIME_FORMAT)
  )
  const isWorkingDay = DateTimeUTC().isoWeekday() < 6

  return isWorkingTime && isWorkingDay
}
