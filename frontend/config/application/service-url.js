const urlService = {
  // Корень сервисов бакенда, должен оканчиваться на слеш "/"
  SERVICE_BASE_URL: process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000/api/'
    : 'http://94.130.98.97:3000/api/'
}

export default urlService
