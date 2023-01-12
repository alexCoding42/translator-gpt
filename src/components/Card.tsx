import { TextInput, View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import styles from './styles';

type CardProsp = {
  cardType: 'translating' | 'translated';
  textField: string;
  setTextField: (value: string) => void;
  submitTranslation: () => void;
  language?: string;
  subLanguage?: string;
  placeholder?: string;
  isLoading?: boolean;
};

export default function Card({
  cardType,
  textField,
  setTextField,
  submitTranslation,
  language,
  subLanguage,
  placeholder,
  isLoading,
}: CardProsp) {
  function applyCardTextStyle() {
    return cardType === 'translating' ? '#fefdfb' : '#000';
  }

  function applyCardPlaceholderStyle() {
    return cardType === 'translating' ? '#f2f3fb' : 'lightgray';
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cardType === 'translating' ? '#f26146' : '#f2f3fb' },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          style={{ marginTop: 130, marginLeft: 'auto', marginRight: 'auto' }}
          size='large'
          color='#000'
        />
      ) : (
        <TextInput
          autoCapitalize='none'
          editable={cardType === 'translating'}
          placeholder={placeholder}
          placeholderTextColor={applyCardPlaceholderStyle()}
          multiline={true}
          onChangeText={setTextField}
          value={textField}
          style={[styles.textField, { color: applyCardTextStyle() }]}
          returnKeyType='done'
          onSubmitEditing={submitTranslation}
        />
      )}
      <View style={styles.languagesContainer}>
        <View style={styles.language}>
          <Text style={{ color: applyCardTextStyle() }}>
            {language ?? 'English'}
          </Text>
          <Entypo
            color={applyCardTextStyle()}
            name='chevron-small-down'
            size={24}
          />
        </View>
        <Text
          style={[styles.languageFootnote, { color: applyCardTextStyle() }]}
        >
          {subLanguage ?? 'Thai'}
        </Text>
      </View>
    </View>
  );
}
