import moment                       from 'moment-timezone';
import momentTimezones              from './../moment/latest.json';

export default function configureMoment() {
  // @todo фикс moment
  moment.createFromInputFallback = (config) => {
    const configI = config;
    configI._d = new Date(config._i);
  };
  moment.locale('ru');
  moment.tz.load(momentTimezones);
  moment.tz.setDefault('Europe/Moscow');
}
