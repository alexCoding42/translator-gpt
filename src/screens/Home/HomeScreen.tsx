import {
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';

import { Card } from '../../components/molecules';
import { CardType } from '../../components/molecules/card/Card';
import { LanguageSwitcher } from '../../components/organisms';

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

const API_ENDPOINT = 'https://api.openai.com/v1/completions';

export default function HomeScreen() {
  const [textToTranslate, setTextToTranslate] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [translatingLang, setTranslatingLang] = useState(Language.english_en);
  const [translatedLang, setTranslatedLang] = useState(Language.thai_en);
  const [translatingFlag, setTranslatingFlag] = useState(
    require('../../../assets/images/flags/united-kingdom.png')
  );
  const [translatedFlag, setTranslatedFlag] = useState(
    require('../../../assets/images/flags/thailand.png')
  );
  const [placeholder, setPlaceholder] = useState(Placeholder.english);
  const [isLoading, setIsLoading] = useState(false);

  let apiKey = Constants?.expoConfig?.extra?.apiKey;

  async function submitTranslation() {
    setTranslatedText('');
    if (textToTranslate === '') {
      return;
    }

    setIsLoading(true);
    await callChatGPTAPI(textToTranslate, apiKey)
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
    if (translatingLang === Language.english_en) {
      setTranslatingLang(Language.thai_en);
      setTranslatedLang(Language.english_en);
      setTranslatingFlag(require('../../../assets/images/flags/thailand.png'));
      setTranslatedFlag(
        require('../../../assets/images/flags/united-kingdom.png')
      );
      setPlaceholder(Placeholder.thai);
    } else {
      setTranslatingLang(Language.english_en);
      setTranslatedLang(Language.thai_en);
      setTranslatingFlag(
        require('../../../assets/images/flags/united-kingdom.png')
      );
      setTranslatedFlag(require('../../../assets/images/flags/thailand.png'));
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
          flag1={translatingFlag}
          flag2={translatedFlag}
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
