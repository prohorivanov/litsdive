/**
 * Сохраням в Storage последний маршрут на котором находились
 *  прежде чем прервать сессию
 */
export const saveLastRouter = ({ getState }) => next => (action) => {
  const { profile } = getState();
  const { type, payload } = action;
  if (type === '@@router/LOCATION_CHANGE' && profile.has('login')) {
    sessionStorage.setItem(`@@router/LOCATION_CHANGE/${profile.get('login')}`, JSON.stringify(payload));
  }
  return next(action);
};

