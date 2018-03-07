import { compose } from 'redux'
import injectReducer from 'utils/injectReducer'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import * as ContactsAction from 'dal/contacts/actions'
import { LOCAL_REDUCER } from './constants'
import mapStateToProps from './selectors'
import container from './container'
import reducer from './reducer'

const withConnect = connect(mapStateToProps, {
  ...ContactsAction
})
const withReducer = injectReducer({key: LOCAL_REDUCER, reducer})

export default compose(
  withReducer,
  withConnect
)(injectIntl(container))
