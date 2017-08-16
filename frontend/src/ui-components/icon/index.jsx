import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import AccountBlocked from './svg/icon-account-blocked';
import AccountClosed from './svg/icon-account-closed';
import Archive from './svg/icon-archive';
import ArrowDown from './svg/icon-arrow-down';
import ArrowLeft from './svg/icon-arrow-left';
import ArrowLeftDouble from './svg/icon-arrow-left-double';
import ArrowRight from './svg/icon-arrow-right';
import ArrowRightDouble from './svg/icon-arrow-right-double';
import ArrowUp from './svg/icon-arrow-up';
import Attachment from './svg/icon-attachment';
import Back from './svg/icon-back';
import BoolFalse from './svg/icon-bool-false';
import BoolTrue from './svg/icon-bool-true';
import Calendar from './svg/icon-calendar';
import CheckSign from './svg/icon-check-sign';
import Clock from './svg/icon-clock';
import Close from './svg/icon-close';
import ContextHorizontal from './svg/icon-context-horizontal';
import ContextRound from './svg/icon-context-round';
import ContextVertical from './svg/icon-context-vertical';
import Documents from './svg/icon-documents';
import Download from './svg/icon-download';
import Draggable from './svg/icon-draggable';
import Dropdown from './svg/icon-dropdown';
import Edit from './svg/icon-edit';
import History from './svg/icon-history';
import Print from './svg/icon-print';
import Recall from './svg/icon-recall';
import Refresh from './svg/icon-refresh';
import Remove from './svg/icon-remove';
import Repeat from './svg/icon-repeat';
import Save from './svg/icon-save';
import SaveAsTemplate from './svg/icon-save-as-template';
import Send from './svg/icon-send';
import Search from './svg/icon-search';
import Settings from './svg/icon-settings';
import Sign from './svg/icon-sign';
import SignAndSend from './svg/icon-sign-and-send';
import Sorting from './svg/icon-sorting';
import SortingAsc from './svg/icon-sorting-asc';
import SortingDesc from './svg/icon-sorting-desc';
import StarFill from './svg/icon-star-fill';
import StarStroke from './svg/icon-star-stroke';
import Unarchive from './svg/icon-unarchive';
import User from './svg/icon-user';
import ViewCompact from './svg/icon-view-compact';
import ViewCorp from './svg/icon-view-corp';
import Visa from './svg/icon-visa';
import './style.css';

/* eslint-disable */
const iconsMap = {
  'account-blocked': <AccountBlocked />,
  'account-closed': <AccountClosed />,
  'archive': <Archive />,
  'arrow-down': <ArrowDown />,
  'arrow-left': <ArrowLeft />,
  'arrow-left-double': <ArrowLeftDouble />,
  'arrow-right': <ArrowRight />,
  'arrow-right-double': <ArrowRightDouble />,
  'arrow-up': <ArrowUp />,
  'attachment': <Attachment />,
  'back': <Back />,
  'bool-false': <BoolFalse />,
  'bool-true': <BoolTrue />,
  'calendar': <Calendar />,
  'check-sign': <CheckSign />,
  'clock': <Clock />,
  'close': <Close />,
  'context-horizontal': <ContextHorizontal />,
  'context-round': <ContextRound />,
  'context-vertical': <ContextVertical />,
  'documents': <Documents />,
  'download': <Download />,
  'draggable': <Draggable />,
  'dropdown': <Dropdown />,
  'edit': <Edit />,
  'history': <History />,
  'print': <Print />,
  'recall': <Recall />,
  'refresh': <Refresh />,
  'remove': <Remove />,
  'repeat': <Repeat />,
  'save': <Save />,
  'save-as-template': <SaveAsTemplate />,
  'search': <Search />,
  'send': <Send />,
  'settings': <Settings />,
  'sign': <Sign />,
  'sign-and-send': <SignAndSend />,
  'sorting': <Sorting />,
  'sorting-asc': <SortingAsc />,
  'sorting-desc': <SortingDesc />,
  'star-fill': <StarFill />,
  'star-stroke': <StarStroke />,
  'unarchive': <Unarchive />,
  'user': <User />,
  'view-compact': <ViewCompact />,
  'view-corp': <ViewCorp />,
  'visa': <Visa />
};
/* eslint-enable */

const Icon = (props) => {
  const { type, size, title, onClick, onMouseDown, onMouseUp, active, className, locator } = props;
  const elementClassName = classnames(
    'b-icon',
    `m-${type}`,
    `m-${size || 24}`,
    className && className,
    onClick && 'm-button',
    active && 's-active'
  );

  return (
    <div
      className={elementClassName}
      title={title}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      data-loc={locator}
    >
      {iconsMap[type]}
    </div>
  );
};

Icon.propTypes = {
  type: PropTypes.oneOf(Object.keys(iconsMap)).isRequired,
  size: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onMouseDown: React.PropTypes.func,
  onMouseUp: React.PropTypes.func,
  active: PropTypes.bool,
  className: PropTypes.string,
  locator: PropTypes.string
};

export default Icon;
