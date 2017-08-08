import { fromJS }        from 'immutable';

export const defaultState = fromJS({
  showProfile     : false,
  statuses        : [],
  fullName        : '',
  login: true,
  accountMovements: []
});

export default function profile(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
