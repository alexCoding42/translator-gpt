import {
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';

import { Card } from '../../components/molecules';
import { CardType } from '../../components/molecules/card/Card';
import { LanguagePopup, LanguageSwitcher } from '../../components/organisms';
import { callChatGPTAPI } from '../../webservices';
import { languages } from '../../data';
import { Language } from '../../models';

export default function HomeScreen() {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [inputLanguage, setInputLanguage] = useState(languages[1]);
  const [outputLanguage, setOutputLanguage] = useState(languages[7]);
  const [isLoading, setIsLoading] = useState(false);
  const [languagePopupType, setLanguagePopupType] = useState<'left' | 'right'>(
    'left'
  );
  const [modalVisible, setModalVisible] = useState(false);

  async function submitTranslation() {
    setTranslatedText('');
    if (textToTranslate === '') {
      return;
    }

    setIsLoading(true);
    await callChatGPTAPI(
      outputLanguage.name,
      textToTranslate,
      outputLanguage.needRomanizedTranslation
    )
      .then((response) => setTranslatedText(response))
      .catch((error) => {
        Alert.alert(
          'Error',
          `An error occurred when submitting translation. Try again later or contact the support.`
        );
        console.error(error);
      });

    setIsLoading(false);
  }

  function switchLanguage() {
    deleteTranslation();
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }

  function selectLeftLanguage() {
    setLanguagePopupType('left');
    setModalVisible(true);
  }

  function selectRightLanguage() {
    setLanguagePopupType('right');
    setModalVisible(true);
  }

  function deleteTranslation() {
    setTextToTranslate('');
    setTranslatedText('');
  }

  function handleSelectedLanguage(selectedLanguage: Language) {
    if (languagePopupType === 'left') {
      setInputLanguage(selectedLanguage);
    } else {
      setOutputLanguage(selectedLanguage);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LanguagePopup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onSelectLanguage={handleSelectedLanguage}
        />
        <LanguageSwitcher
          leftLanguage={inputLanguage.name}
          rightLanguage={outputLanguage.name}
          leftFlag={inputLanguage.flag}
          rightFlag={outputLanguage.flag}
          switchLanguage={switchLanguage}
          selectLeftLanguage={selectLeftLanguage}
          selectRightLanguage={selectRightLanguage}
        />
        <Card
          type={CardType.editable}
          textFieldValue={textToTranslate}
          setTextFieldValue={setTextToTranslate}
          placeholder={inputLanguage.placeholder}
          submit={submitTranslation}
        />
        <Card
          type={CardType.nonEditable}
          placeholder={null}
          textFieldValue={translatedText}
          showLoadingIndicator={isLoading}
          deleteField={deleteTranslation}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
  },
});
