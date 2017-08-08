import {
  REDUCER_NAME
}  from './constants';

const productsListSelector = state => state.getIn([REDUCER_NAME, 'productsList']);
const loaderSelector = state => state.getIn([REDUCER_NAME, 'loader']);

export const selectIndexContainer = state => ({
  productsList: productsListSelector(state),
  loader: loaderSelector(state),
});
