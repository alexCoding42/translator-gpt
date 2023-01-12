import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  textField: {
    marginTop: 130,
    width: '100%',
    height: 130,
    fontWeight: '500',
  },
  languagesContainer: {
    marginTop: 'auto',
    paddingBottom: 32,
  },
  language: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageFootnote: {
    fontSize: 12,
  },
});

export default styles;
