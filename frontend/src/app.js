import "styles/base.css";
import RunRouter from "./router";
import boot from "./bootstrap";

/**
 *
 * @todo
 * Старт приложения происходит только после авторизации
 *  и получения данных пользователя
 * Зашли на страницу. Keycloack определил что мы не авторизованы
 * Перебросил нас на страницу ( http://auth.dev.raiffeisen.ru/authorize !!!! ) с параметрами
 * После авторизации снова редирект на наше приложение
 *
 * Получаем { Organizations, UserSettings } и только потом авторизованного юзера
 */
function initApp() {
  RunRouter();
}

/**
 * app start
 */
document.addEventListener('DOMContentLoaded', () => {
  boot();
  initApp();
});