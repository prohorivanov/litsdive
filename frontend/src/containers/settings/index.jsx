import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import * as ProfileAction       from 'dal/profile/actions';
import { connect }              from 'react-redux';
import { mapStateToProps }      from './selectors';
import SettingsPassword         from './password'; // eslint-disable-line import/no-named-as-default
import CryptoProSettings        from './crypto-pro';
import {
  Layout,
  Header,
  H2,
  Body,
  CollLeft,
  CollRight,
  ShadowBlockExtend,
  LinkItemStyle
} from './style.js';

export const SettingsLayout = ({ params: { settingsTypeUrl }, settingsSection }) => (
  <Layout className="b-settings-layout">
    <ShadowBlockExtend>
      <Header dataLocHeader="settingsTitle">
        <H2>Настройки системы</H2>
      </Header>
      <Body>
        <CollLeft>
          {settingsSection.map((settings, i) =>
            <SettingsItem
              settings={settings}
              settingsTypeUrl={settingsTypeUrl}
              key={i}
            />
          )}
        </CollLeft>
        <CollRight>
          {!settingsTypeUrl && <SettingsPassword />}
          {(settingsTypeUrl === 'crypto-pro') && <CryptoProSettings />}
        </CollRight>
      </Body>
    </ShadowBlockExtend>
  </Layout>
);

SettingsLayout.propTypes = {
  settingsSection: PropTypes.instanceOf(List),
  params: PropTypes.shape({
    settingsTypeUrl: PropTypes.oneOf([
      'merge-org',
      'crypto-pro'
    ])
  })
};

const SettingsItem = ({ settings, onClick, settingsTypeUrl }) => (
  <LinkItemStyle
    to={`/settings/${settings.get('link')}`}
    onClick={onClick}
    className={(settingsTypeUrl === settings.get('type')) ? 'active' : ''}
  >
    {settings.get('label')}
  </LinkItemStyle>
);

SettingsItem.propTypes = {
  onClick: PropTypes.func,
  settings: PropTypes.object,
  settingsTypeUrl: PropTypes.string
};

export default connect(
  mapStateToProps,
  {
    ...ProfileAction
  }
)(SettingsLayout);

