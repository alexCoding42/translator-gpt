import { View, StyleSheet } from 'react-native';
import React from 'react';

const CardDivider = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    marginTop: 'auto',
    marginBottom: 32,
    borderBottomWidth: 1,
    borderColor: '#f2f4ff',
  },
});

export default CardDivider;
