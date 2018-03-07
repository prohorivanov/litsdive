import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
import injectSaga from 'utils/injectSaga'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { LOCAL_REDUCER, LOCAL_SAGAS } from './constants'
import mapStateToProps from './selectors'
import * as actions from './actions'
import container from './container'
import saga from './sagas'
import reducer from './reducer'

const withConnect = connect(mapStateToProps, actions)
const withReducer = injectReducer({key: LOCAL_REDUCER, reducer})
const withSaga = injectSaga({key: LOCAL_SAGAS, saga})

export default compose(
  withReducer,
  withSaga,
  withConnect
)(injectIntl(container))
