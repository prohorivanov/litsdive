import { Map } from 'immutable';
import {
  FIELD_NEW_PASSWORD,
} from './constants';


export const warn = (values) => {
  let warnings = new Map({});

  if (values.has(FIELD_NEW_PASSWORD) && values.get(FIELD_NEW_PASSWORD).length > 30) {
    warnings = warnings.set(FIELD_NEW_PASSWORD, 'Пароль слишком длинный');
  }
  return warnings.toJS();
};
