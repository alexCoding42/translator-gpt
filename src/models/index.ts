import { ImageSourcePropType } from 'react-native/types';

export interface Language {
  id: number;
  name: string;
  placeholder: string;
  flag: ImageSourcePropType | undefined;
  needRomanizedTranslation: boolean;
}
