import { Language } from '../models';

export const languages: Language[] = [
  {
    id: 1,
    name: 'English',
    placeholder: 'Type something',
    flag: require('../../assets/images/flags/united-kingdom.png'),
    needRomanizedTranslation: false,
  },
  {
    id: 2,
    name: 'Thai',
    placeholder: 'พิมพ์บางอย่าง',
    flag: require('../../assets/images/flags/thailand.png'),
    needRomanizedTranslation: true,
  },
];
