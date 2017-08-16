import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  reduxForm,
  Field
} from 'redux-form/immutable';
import * as ProfileAction       from 'dal/profile/actions';
import { connect }              from 'react-redux';
import * as LocalActions       from './actions';
import { mapStateToProps }      from './selectors';
import { warn } from './validate';
import { FieldInput } from '../fields';
import {
  Flex,
  Wrapper,
  Body,
  Row,
  Description,
  Footer,
  FormErrors,
  ButtonExtend
} from './style.js';
import { SectionTitle } from '../style.js';


import {
  FORM_NAME,
  FIELD_OLD_PASSWORD,
  FIELD_NEW_PASSWORD,
  FIELD_NEW_PASSWORD_CONFIRM
} from './constants';

export class SettingsPassword extends PureComponent {

  static propTypes = {
    changePasswordAction: PropTypes.func.isRequired,
    error: PropTypes.string,
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    isButtonEnabled: PropTypes.string,
  }
  
  /**
   *
   * @param evt
   * @private
   */
  handleSubmitPassword = (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const { changePasswordAction } = this.props;
    changePasswordAction();
  };
  
  render() {
    const {
      error,
      submitting,
      invalid,
      isButtonEnabled
    } = this.props;

    return (
      <form
        onSubmit={this.handleSubmitPassword}
        data-loc="formsSettingsChangePassword"
      >
        <SectionTitle>
          <h3>СМЕНА ПАРОЛЯ</h3>
        </SectionTitle>
        <Body>
          <Flex>
            <Wrapper>
              <Row>
                <Field
                  autoFocus
                  name={FIELD_OLD_PASSWORD}
                  component={FieldInput}
                  type="password"
                  placeholder="Текущий пароль"
                />
              </Row>
              <Row>
                <Field
                  name={FIELD_NEW_PASSWORD}
                  component={FieldInput}
                  type="password"
                  placeholder="Новый пароль"
                />
              </Row>
              <Row>
                <Field
                  name={FIELD_NEW_PASSWORD_CONFIRM}
                  component={FieldInput}
                  type="password"
                  placeholder="Новый пароль еще раз"
                />
              </Row>
              <Row>
                <ButtonExtend
                  primary
                  className="button"
                  loading={submitting}
                  disabled={submitting || !isButtonEnabled ? 'disabled' : ''}
                  type="submit"
                  name="settingsChangePasswordSubmit"
                  data-loc="settingsChangePasswordSubmit"
                >
                  Изменить пароль
                </ButtonExtend>
              </Row>
            </Wrapper>
            <Description data-loc="settingsChangePasswordInfo">
              <Row>
                <b>Из соображений безопасности рекомендуем вам использовать уникальный пароль, который не используется вами нигде в интернете. Никому не сообщайте свой пароль.</b>
              </Row>
              <Row>
                Длина пароля должна быть не меньше 1 символа
              </Row>
              <Row>
                Пароль не должен содержать последовательность символов, входящую в состав индивидуального имени пользователя (логина)
              </Row>
              <Row>
                Пароль не должен совпадать с предыдущим паролем
              </Row>
            </Description>
          </Flex>
        </Body>
        <Footer>
          <FormErrors data-loc="settingsChangePasswordError">
            {(error && invalid) && <span>{error}</span>}
          </FormErrors>
        </Footer>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  {
    ...ProfileAction,
    ...LocalActions
  }
)(reduxForm({
  form: FORM_NAME,
  warn
})(SettingsPassword));

