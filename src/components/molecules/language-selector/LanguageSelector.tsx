import {
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { Flag } from '../../atoms';

interface LanguageSelectorProps {
  text: string;
  flag: ImageSourcePropType | undefined;
}

const LanguageSelector = ({ text, flag }: LanguageSelectorProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Flag flag={flag} />
      <Text style={styles.text}>{text}</Text>
      <Entypo color='#fff' name='chevron-small-down' size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: '#fff',
  },
});

export default LanguageSelector;
