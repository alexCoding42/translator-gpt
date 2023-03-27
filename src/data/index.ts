import { Language } from '../models';

export const languages: Language[] = [
  {
    id: '1',
    code: 'zh',
    name: 'Chinese',
    placeholder: '输入一些内容',
    flag: require('../../assets/images/flags/china.png'),
    needRomanizedTranslation: true,
  },
  {
    id: '2',
    code: 'en',
    name: 'English',
    placeholder: 'Type something',
    flag: require('../../assets/images/flags/united-kingdom.png'),
    needRomanizedTranslation: false,
  },
  {
    id: '3',
    code: 'fr',
    name: 'French',
    placeholder: 'Écrivez quelque chose',
    flag: require('../../assets/images/flags/france.png'),
    needRomanizedTranslation: false,
  },
  {
    id: '4',
    code: 'de',
    name: 'German',
    placeholder: 'Tippe etwas',
    flag: require('../../assets/images/flags/germany.png'),
    needRomanizedTranslation: false,
  },
  {
    id: '5',
    code: 'hi',
    name: 'Hindi',
    placeholder: 'कुछ टाइप करें',
    flag: require('../../assets/images/flags/india.png'),
    needRomanizedTranslation: true,
  },
  {
    id: '6',
    code: 'ja',
    name: 'Japanese',
    placeholder: '何か入力してください',
    flag: require('../../assets/images/flags/japan.png'),
    needRomanizedTranslation: true,
  },
  {
    id: '7',
    code: 'es',
    name: 'Spanish',
    placeholder: 'Escribe algo',
    flag: require('../../assets/images/flags/spain.png'),
    needRomanizedTranslation: false,
  },
  {
    id: '8',
    code: 'th',
    name: 'Thai',
    placeholder: 'พิมพ์บางอย่าง',
    flag: require('../../assets/images/flags/thailand.png'),
    needRomanizedTranslation: true,
  },
];
