import 'styles/base.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter as ReduxRouter } from 'react-router-redux'
import 'react-select/dist/react-select.css'
import Application from './application'
import { history } from './app-history'
import store from './store'
import boot from './bootstrap'

function renderApp () {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <ReduxRouter history={history}>
          <Application/>
        </ReduxRouter>
      </BrowserRouter>
    </Provider>,
    document.querySelector('#MAIN_CONTENT')
  )
}

/**
 * app start
 */
document.addEventListener('DOMContentLoaded', () => {
  boot()
  renderApp()
})
