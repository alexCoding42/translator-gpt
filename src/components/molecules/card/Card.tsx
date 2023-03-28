import React, { useRef } from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
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
  const textInputRef = useRef<TextInput>(null);

  const handleCardPress = () => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  };

  return (
    <LinearGradient
      colors={['#0f0644', '#420084']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.root}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleCardPress}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          {showLoadingIndicator ? (
            <ActivityIndicator
              style={styles.loadingIndicator}
              size='large'
              color='#fff'
            />
          ) : (
            <TextInput
              ref={textInputRef}
              autoCapitalize='none'
              style={styles.textInput}
              value={textFieldValue}
              placeholder={placeholder ?? ''}
              placeholderTextColor='#A0A0A0'
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
      </TouchableOpacity>
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
  contentContainer: {
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
