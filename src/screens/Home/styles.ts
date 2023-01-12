import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    position: 'relative',
  },
  swapButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    top: '50%',
    left: '10%',
    zIndex: 100,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
  },
});

export default styles;
