import { fromJS } from 'immutable';


const settingsSection = fromJS([
  {
    type: undefined,
    link: '',
    label: 'Смена пароля'
  },
  {
    type: 'merge-org',
    link: 'merge-org',
    label: 'Объединение организаций'
  },
  {
    type: 'crypto-pro',
    link: 'crypto-pro',
    label: 'Сертификаты КриптоПРО'
  }
]);

const initialState = fromJS({
  settingsSection
});

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
