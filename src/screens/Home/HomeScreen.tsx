import {
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import LanguageSwitcher from '../../components/organisms';
import Card from '../../components/molecules';
import { CardType } from '../../components/molecules/card/Card';
import { API_ENDPOINT, API_KEY } from '../../constants';

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

  async function submitTranslation() {
    setTranslatedText('');
    if (textToTranslate === '') {
      return;
    }

    setIsLoading(true);
    await callChatGPTAPI(textToTranslate, API_KEY)
      .then((response) => setTranslatedText(response))
      .catch((error) => console.error(error));

    setIsLoading(false);
  }

  function switchLanguage() {
    deleteTranslation();
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

  async function callChatGPTAPI(prompt: string, apiKey: string) {
    const response = await axios.post(
      API_ENDPOINT,
      {
        model: 'text-davinci-003',
        prompt:
          translatedLang === Language.thai_en
            ? `Translate this into ${translatedLang} and romanized thai: ${prompt}`
            : `Translate this into ${translatedLang}: ${prompt}`,
        temperature: 0.3,
        max_tokens: 100,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    if (response.status !== 200) {
      throw new Error(response.data.message);
    }
    return response.data?.choices[0]?.text.replace(/\n\n/g, '');
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
