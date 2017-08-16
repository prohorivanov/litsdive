import { axiosConfig } from 'config/application/axios';
import configureMoment from 'config/application/moment';
import configureNumeral from 'config/application/numeral';


/**
 * Bootstraping
 */
export default function boot() {
  configureMoment();
  configureNumeral();
  axiosConfig.init();
}
