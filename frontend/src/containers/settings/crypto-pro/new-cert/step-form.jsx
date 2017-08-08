import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { List, fromJS } from 'immutable';
import {
  Field
} from 'redux-form/immutable';
import {
  FieldText,
  FieldInput,
  FieldDropDown
} from '../../fields';
import {
  FIELD_ULK,
  FIELD_SIGNER,
  FIELD_EMAIL,
  FIELD_CITY,
  FIELD_SUBDIVISION,
  FIELD_ORGANIZATION,
  FIELD_COUNTRY
} from '../constants';
import {
  Gray,
  Black,
  Body,
  Footer,
  WorkCryptoPro,
  LoadingText,
  LoaderExtend,
  ButtonExtend
} from './style.js';

import {
  DirectionColumn,
  Row,
  RowFlex,
  InfoError,
} from '../style.js';

import {
  Header,
  H2
} from '../../style.js';

const StepForm = (props) => {
  const {
    error,
    submittingForm,
    handleSubmit,
    ulcValues,
    cpsValues,
    changeUlkAction,
    status,
    certNumber
  } = props;

  function onChangeOlk(value) {
    value.preventDefault();
    changeUlkAction(fromJS(value));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="b-forms"
    >
      <Header>
        <H2> Запрос на новый сертификат № {certNumber} </H2>
        <div>
          <Gray>От:</Gray> <Black>{moment().format('DD.MM.YYYY')}</Black>
          <Gray> · Статус:</Gray> <Black>{status}</Black>
        </div>
      </Header>
      <Body>
        {error && <InfoError>{error}</InfoError>}
        <DirectionColumn>
          <Row>
            <Field
              name={FIELD_ULK}
              component={FieldDropDown}
              onChange={onChangeOlk}
              options={ulcValues}
              testLocator={FIELD_ULK}
              label="Уполномоченное лицо"
            />
          </Row>
          <Row>
            <Field
              name={FIELD_SIGNER}
              component={FieldDropDown}
              options={cpsValues}
              testLocator={FIELD_SIGNER}
              label="Средство подписи"
            />
          </Row>
          <Row>
            <Field
              name={FIELD_EMAIL}
              autoFocus
              component={FieldInput}
              type="text"
              label="Email"
            />
          </Row>
          <Row>
            <Field
              name={FIELD_CITY}
              component={FieldInput}
              type="text"
              label="Город"
            />
          </Row>
          <Row>
            <Field
              name={FIELD_COUNTRY}
              component={FieldText}
              testLocator={FIELD_COUNTRY}
              label="Страна"
            />
          </Row>
          <Row>
            <Field
              name={FIELD_ORGANIZATION}
              component={FieldText}
              testLocator={FIELD_ORGANIZATION}
              label="Организация"
            />
          </Row>
          <Row>
            <Field
              name={FIELD_SUBDIVISION}
              component={FieldText}
              testLocator={FIELD_ORGANIZATION}
              label="Подразделение"
            />
          </Row>
        </DirectionColumn>
      </Body>
      <Footer>
        <RowFlex>
          <ButtonExtend
            primary
            size="large"
            className="button"
            disabled={submittingForm}
            type="submit"
            name="createNewCertSubmit"
            data-loc="createNewCertSubmit"
          >
            Создать и отправить
          </ButtonExtend>
          <WorkCryptoPro>
            {submittingForm && <LoaderExtend /> }
            {submittingForm && <LoadingText>Идет работа в КриптоПРО</LoadingText>}
          </WorkCryptoPro>
        </RowFlex>
      </Footer>
    </form>
  );
};

StepForm.propTypes = {
  submittingForm: PropTypes.bool,
  error: PropTypes.string,
  status: PropTypes.string,
  certNumber: PropTypes.number,
  handleSubmit: PropTypes.func,
  changeUlkAction: PropTypes.func,
  ulcValues: PropTypes.instanceOf(List),
  cpsValues: PropTypes.instanceOf(List),
};

export default StepForm;

