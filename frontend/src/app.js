import 'styles/base.css'
import RunRouter from './router'
import boot from './bootstrap'

function initApp () {
  RunRouter()
}

/**
 * app start
 */
document.addEventListener('DOMContentLoaded', () => {
  boot()
  initApp()
})
