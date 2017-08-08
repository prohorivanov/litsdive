import {
  COMBINE_REDUCERS,
  SETTINGS_REDUCER
} from './constants';

const profileSelector = state => state.get('profile');

const settingsSectionSelector = state =>
  state.getIn([COMBINE_REDUCERS, SETTINGS_REDUCER, 'settingsSection']);

export const mapStateToProps = state => ({
  profile: profileSelector(state),
  settingsSection: settingsSectionSelector(state),
});
