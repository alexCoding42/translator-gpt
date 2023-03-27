import { ImageSourcePropType } from 'react-native/types';

export interface Language {
  id: string;
  code: string;
  name: string;
  placeholder: string;
  flag: ImageSourcePropType | undefined;
  needRomanizedTranslation: boolean;
}
