import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { CardDivider, TrashIcon } from '../../atoms';
import { LinearGradient } from 'expo-linear-gradient';

const { height } = Dimensions.get('window');

export enum CardType {
  editable,
  nonEditable,
}

interface CardProps {
  type?: CardType;
  textFieldValue?: string;
  placeholder?: string | null;
  setTextFieldValue?: (value: string) => void;
  submit?: () => void;
  showLoadingIndicator?: boolean;
  deleteField?: () => void;
}

const Card = ({
  type = CardType.editable,
  textFieldValue,
  placeholder = 'Enter your text here',
  setTextFieldValue,
  submit,
  showLoadingIndicator = false,
  deleteField,
}: CardProps) => {
  return (
    <LinearGradient
      colors={['#0f0644', '#420084']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <View style={styles.container}>
        {showLoadingIndicator ? (
          <ActivityIndicator
            style={styles.loadingIndicator}
            size='large'
            color='#fff'
          />
        ) : (
          <TextInput
            autoCapitalize='none'
            style={styles.textInput}
            value={textFieldValue}
            placeholder={placeholder ?? ''}
            placeholderTextColor='#fff'
            multiline={true}
            blurOnSubmit={true}
            returnKeyType='go'
            editable={type === CardType.editable}
            onChangeText={setTextFieldValue}
            onSubmitEditing={submit}
          />
        )}
        <CardDivider />
        {deleteField && textFieldValue && (
          <TrashIcon handleDelete={deleteField} />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 16,
    width: '100%',
    minHeight: height / 3,
    padding: 16,
    backgroundColor: 'white',
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
    borderRadius: 16,
  },
  container: {
    flex: 1,
  },
  loadingIndicator: {
    flex: 1,
    alignSelf: 'center',
  },
  textInput: {
    color: '#fff',
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
    fontSize: 20,
    fontWeight: '500',
  },
});

export default Card;
