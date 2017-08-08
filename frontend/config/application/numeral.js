import numeral from 'numeral';

numeral.register('locale', 'rbo-ru', {
  delimiters: {
    thousands: ' ',
    decimal: '.'
  },
  abbreviations: {
    thousand: ' тыс.',
    million: ' млн.',
    billion: ' млрд.',
    trillion: ' трлн.'
  },
  ordinal() {
    // not ideal, but since in Russian it can taken on
    // different forms (masculine, feminine, neuter)
    // this is all we can do
    return '.';
  },
  currency: {
    symbol: 'RUR'
  }
});

export default function configureNumeral() {
  numeral.locale('rbo-ru');
}
