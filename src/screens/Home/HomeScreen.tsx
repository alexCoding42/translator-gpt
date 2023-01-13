import {
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import LanguageSwitcher from '../../components/organisms';
import Card from '../../components/molecules';
import { CardType } from '../../components/molecules/card/Card';

enum Language {
  thai_en = 'Thai',
  thai_th = 'ภาษาไทย',
  english_en = 'English',
  english_th = 'ภาษาอังกฤษ',
}

enum Placeholder {
  english = 'Type something',
  thai = 'พิมพ์บางอย่าง',
}

export default function HomeScreen() {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translatingLang, setTranslatingLang] = useState(Language.english_en);
  const [translatedLang, setTranslatedLang] = useState(Language.thai_en);
  const [placeholder, setPlaceholder] = useState(Placeholder.english);
  const [isLoading, setIsLoading] = useState(false);

  function submitTranslation() {
    if (textToTranslate === '') {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setTranslatedText(
        'Translation is working properly, API can be handled now'
      );
      setIsLoading(false);
    }, 3000);
  }

  function switchLanguage() {
    if (translatingLang === Language.english_en) {
      setTranslatingLang(Language.thai_en);
      setTranslatedLang(Language.english_en);
      setPlaceholder(Placeholder.thai);
    } else {
      setTranslatingLang(Language.english_en);
      setTranslatedLang(Language.thai_en);
      setPlaceholder(Placeholder.english);
    }
  }

  function deleteTranslation() {
    setTextToTranslate('');
    setTranslatedText('');
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 100}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <LanguageSwitcher
          lang1={translatingLang}
          lang2={translatedLang}
          switchLanguage={switchLanguage}
        />
        <Card
          type={CardType.editable}
          textFieldValue={textToTranslate}
          setTextFieldValue={setTextToTranslate}
          placeholder={placeholder}
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
