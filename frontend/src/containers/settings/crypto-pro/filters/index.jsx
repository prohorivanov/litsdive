import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { List } from 'immutable';
import { connect } from 'react-redux';
import { mapStateToProps } from '../selectors';
import {
  sortCertAction,
  changeStatusAction,
  clearStatusAction,
  changeSortValueAction
} from '../actions';
import {
  Wraper,
  Plus,
  FiltersBlock,
  StatusValueCrear,
  DropdownBoxExtend,
  StatusValue,
  ButtonCreateNewCert
} from './style.js';

import {
  FILTER_SORT_NEW,
  FILTER_SORT_OLD
} from '../constants';

class Filters extends PureComponent {
  static propTypes = {
    changeStatusAction: PropTypes.func.isRequired,
    sortCertAction: PropTypes.func.isRequired,
    onHandleCreateCert: PropTypes.func.isRequired,
    clearStatusAction: PropTypes.func.isRequired,
    changeSortValueAction: PropTypes.func.isRequired,
    statusValues: PropTypes.instanceOf(List).isRequired,
    statusValue: PropTypes.object,
    sortValue: PropTypes.object,
    sortValues: PropTypes.instanceOf(List).isRequired,
  }

  state = {
    isOpenPopupBox: false
  }

  onChangeStatus = (evt, value) => {
    this.props.changeStatusAction(value);
  }

  onClearStatus = (evt, value) => {
    evt.stopPropagation();
    this.props.clearStatusAction(value);
  }

  onSortCertAsc = debounce(() => {
    this.props.sortCertAction(FILTER_SORT_NEW);
  }, 200)

  onSortCertDesc = debounce(() => {
    this.props.sortCertAction(FILTER_SORT_OLD);
  }, 200)

  /**
   * направление сортировки
   * @param evt
   * @param value
   */
  onChangeSortDirection = (evt, value) => {
    if (value && value.get('sortDirection') === FILTER_SORT_NEW) {
      this.onSortCertAsc();
    } else if (value && value.get('sortDirection') === FILTER_SORT_OLD) {
      this.onSortCertDesc();
    }
    this.props.changeSortValueAction(value);
  }

  valueRenderer = (itemDropDown) => {
    const { title } = itemDropDown;
    return (
      <StatusValue>
        {title}
        <StatusValueCrear
          type="close"
          size="16"
          onClick={this.onClearStatus}
        />
      </StatusValue>
    );
  }

  render() {
    const {
      statusValues,
      statusValue,
      onHandleCreateCert,
      sortValue,
      sortValues
    } = this.props;
    return (
      <FiltersBlock>
        <Wraper>
          <DropdownBoxExtend
            isGetFullValue
            maxHeight={350}
            value={!statusValue.size ? null : statusValue.toJS()}
            options={statusValues.toJS()}
            valueRenderer={this.valueRenderer}
            placeholder="Статус"
            onChange={this.onChangeStatus}
          />
          <DropdownBoxExtend
            isGetFullValue
            maxHeight={350}
            value={sortValue.toJS()}
            options={sortValues.toJS()}
            onChange={this.onChangeSortDirection}
          />
          <ButtonCreateNewCert onClick={onHandleCreateCert}>
            <Plus /> Запросить сертификат
          </ButtonCreateNewCert>
        </Wraper>
      </FiltersBlock>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    sortCertAction,
    clearStatusAction,
    changeStatusAction,
    changeSortValueAction
  }
)(Filters);
