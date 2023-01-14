import { Image, View, StyleSheet, ImageSourcePropType } from 'react-native';
import React from 'react';

interface FlagProps {
  flag: ImageSourcePropType | undefined;
}

const Flag = ({ flag }: FlagProps) => {
  return (
    <View style={styles.container}>
      <Image source={flag} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 30,
    height: 30,
    overflow: 'hidden',
    marginRight: 8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default Flag;
