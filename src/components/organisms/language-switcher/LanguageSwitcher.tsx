import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LanguageSelector } from '../../molecules';

interface LanguageSwitcherProps {
  leftLanguage: string;
  rightLanguage: string;
  leftFlag: ImageSourcePropType | undefined;
  rightFlag: ImageSourcePropType | undefined;
  switchLanguage: () => void;
  selectLeftLanguage: () => void;
  selectRightLanguage: () => void;
}

const LanguageSwitcher = ({
  leftLanguage,
  rightLanguage,
  leftFlag,
  rightFlag,
  switchLanguage,
  selectLeftLanguage,
  selectRightLanguage,
}: LanguageSwitcherProps) => {
  return (
    <LinearGradient
      colors={['#0f0644', '#420084']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <View style={styles.container}>
        <LanguageSelector
          text={leftLanguage}
          flag={leftFlag}
          selectLanguage={selectLeftLanguage}
        />
        <TouchableOpacity onPress={switchLanguage}>
          <Ionicons name='swap-horizontal' size={20} color='#fff' />
        </TouchableOpacity>
        <LanguageSelector
          text={rightLanguage}
          flag={rightFlag}
          selectLanguage={selectRightLanguage}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 16,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    height: Platform.OS === 'ios' ? 80 : 60,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LanguageSwitcher;
