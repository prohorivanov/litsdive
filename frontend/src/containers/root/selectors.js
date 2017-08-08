const menuSelector = state => state.getIn(['rootReducer', 'menu']);

export const selectors = state => ({
  profile: state.get('profile'),
  menu: menuSelector(state),
});
