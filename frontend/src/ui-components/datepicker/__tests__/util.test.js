import { expect }                   from 'chai';
import moment                       from 'moment';
import { formatDate, isValidDate }  from '../util';

describe('DatePicker util test', () => {
  it('formatDate test', () => {
    const { formatValue, date } = formatDate('12.12.2017');
    expect(formatValue).to.eql('20171212');
    expect(date instanceof moment).to.be.true;
  });

  it('isValidDate test', () => {
    let isValid = isValidDate('12.12.2017');
    expect(isValid).to.be.true;

    isValid = isValidDate('12.12.20');
    expect(isValid).to.be.false;
  });
});
