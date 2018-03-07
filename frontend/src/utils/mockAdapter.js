/* eslint-disable */
import MockAdapter from 'axios-mock-adapter'

function setMocks (instance) {
  const mock = new MockAdapter(instance)
}

export default setMocks
