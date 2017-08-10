import React from 'react'
import ReactDOM from 'react-dom'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import { history } from 'app-history'
import store from './store'
import Header from './containers/root/header'
import Footer from './containers/root/footer'
import createRoutes from './routes-share'

const makeSelectLocationState = () => {
  let prevRoutingState
  let prevRoutingStateJS

  return (state) => {
    const routingState = state.get('routing')
    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState
      prevRoutingStateJS = routingState.toJS()
    }

    return prevRoutingStateJS
  }
}

history.listenBefore((location, callback) => {
  if (!location.state || !location.state.top) {
    window.scrollTo(0, 0)
  }
  callback()
})

export default function RunRouter () {
  const reduxHistory = syncHistoryWithStore(history, store, {
    selectLocationState: makeSelectLocationState()
  })
  ReactDOM.render(
    <Provider store={store}>
      {createRoutes(reduxHistory)}
    </Provider>,
    document.querySelector('#MAIN_CONTENT')
  )

  ReactDOM.render(
    <Provider store={store}>
      <Header />
    </Provider>,
    document.querySelector('#MAIN_HEADER')
  )

  ReactDOM.render(
    <Provider store={store}>
      <Footer />
    </Provider>,
    document.querySelector('#MAIN_FOOTER')
  )
}
