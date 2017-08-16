import serviceUrl from 'config/application/service-url';

/**
 * Смена пароля пользователя
 * @param  {string} currentPassword старый пароль
 * @param  {string} newPassword новый пароль
 * @return {Object}
 */
export function updatePassword({currentPassword, newPassword}) {
  const endpoint = {
    url: `${serviceUrl.SERVICE_BASE_URL}change-password`,
    method: 'POST',
  };
  const data = {
    currentPassword,
    newPassword
  };
  return { ...endpoint, data };
}

/**
 * Выход из системы
 * @return {Object}
 */
export function logout() {
  const endpoint = {
    baseURL: serviceUrl.SERVICE_BASE_URL,
    url: 'logout',
    method: 'DELETE'
  };
  return { ...endpoint };
}

/**
 * Запрос на получения правил безопасности для пароля
 * @return {Object}
 */
export const findRuleChangePassword = () => ({
  url: 'securityProfiles'
});
