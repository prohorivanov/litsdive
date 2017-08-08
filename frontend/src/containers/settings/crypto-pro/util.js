import { Map } from 'immutable';

/**
 *
 * @param item
 * @param valueKey
 * @param titleKey
 */
export const prepareForDropBox = (item, valueKey, titleKey) => Map({
  value: item.get(valueKey),
  title: item.get(titleKey),
  ...item.toJS()
});
