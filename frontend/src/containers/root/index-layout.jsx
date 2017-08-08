import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import * as ProfileAction from 'dal/profile/actions';
import RootWrapperLayout from './index';
import Header from './header';
import { selectors } from './selectors';
import { ContentWrapper, IndexLayout } from './style.js';

const IndexWrapperLayout = props => (
  <RootWrapperLayout>
    <IndexLayout>
      <Header menu={props.menu.toJS()} />
      <ContentWrapper>
        {cloneElement(props.children, { props })}
      </ContentWrapper>
    </IndexLayout>
  </RootWrapperLayout>
);

IndexWrapperLayout.propTypes = {
  menu: PropTypes.instanceOf(List).isRequired,
  children: PropTypes.element.isRequired
};

export default connect(selectors,
  {
    ...ProfileAction
  }
)(IndexWrapperLayout);
