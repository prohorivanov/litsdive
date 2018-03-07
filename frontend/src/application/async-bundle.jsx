import React from 'react'
import {
  ErrorContainer,
  ErrorContainerTitle,
  ErrorContainerDetails
} from './style'

export default (loader, collection) => (
  class AsyncComponent extends React.Component {
    state = {
      hasError: false,
      errorInfo: null,
      errorComponent: null
    }

    constructor (props) {
      super(props)
      this.Component = null
      this.state = {comp: AsyncComponent.Component}
    }

    componentWillMount () {
      if (!this.state.comp) {
        loader().then((Component) => {
          AsyncComponent.Component = Component
          this.setState({comp: Component})
        })
      }
    }

    componentDidCatch (error, info) {
      this.setState({
        hasError: true,
        errorInfo: info,
        errorComponent: error
      })
    }

    render () {
      const {comp, hasError, errorInfo, errorComponent} = this.state

      if (hasError && errorInfo && process.env.NODE_ENV !== 'production') {
        return (
          <ErrorContainer>
            <ErrorContainerTitle>Something went wrong.</ErrorContainerTitle>
            <ErrorContainerDetails>
              {errorComponent && errorComponent.toString()}
              <br/>
              {errorInfo.componentStack}
            </ErrorContainerDetails>
          </ErrorContainer>
        )
      }

      return (comp && !hasError)
        ? React.createElement(comp, {...this.props, ...collection})
        : null
    }
  }
)
