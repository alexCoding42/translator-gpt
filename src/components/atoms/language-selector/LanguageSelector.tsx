import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';

interface LanguageSelectorProps {
  text: string;
}

const LanguageSelector = ({ text }: LanguageSelectorProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Text style={styles.text}>{text}</Text>
      <Entypo color='#fff' name='chevron-small-down' size={20} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    color: '#fff',
  },
});

export default LanguageSelector;
