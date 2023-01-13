import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { LanguageSelector } from '../../atoms';

interface LanguageSwitcherProps {
  lang1: string;
  lang2: string;
  switchLanguage: () => void;
}

const LanguageSwitcher = ({
  lang1,
  lang2,
  switchLanguage,
}: LanguageSwitcherProps) => {
  return (
    <LinearGradient
      colors={['#4a51d8', '#5f44da']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <View style={styles.container}>
        <LanguageSelector text={lang1} />
        <TouchableOpacity onPress={switchLanguage}>
          <Ionicons name='swap-horizontal' size={20} color='#fff' />
        </TouchableOpacity>
        <LanguageSelector text={lang2} />
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
