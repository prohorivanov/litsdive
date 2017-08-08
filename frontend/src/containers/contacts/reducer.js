import { fromJS } from 'immutable';
import { ACTIONS } from './constants';

const initialState = fromJS({
  contacts: []
});

export default function contactsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CONTACTS_CONTAINER_GET_SUCCESS:
      return state.set('contacts', fromJS(action.payload));
    default:
      return state;
  }
}
