import { fromJS } from 'immutable';
import { ACTIONS } from './constants';

const initialState = fromJS({
  productsList: [],
  loader: false,
});

export default function productsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.PRODUCTS_CONTAINER_GET_LIST_SUCCESS:
      return state
          .set('productsList', fromJS(action.payload))
          .set('loader', false);
    case ACTIONS.PRODUCTS_CONTAINER_GET_LIST_FAIL:
      return state.set('loader', false);
    case ACTIONS.PRODUCTS_CONTAINER_GET_LIST_REQUEST:
      return state.set('loader', true);
    default:
      return state;
  }
}
