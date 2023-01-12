import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Card from '../../components/Card';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

enum Language {
  thai_en = 'Thai',
  thai_th = 'ภาษาไทย',
  english_en = 'English',
  english_th = 'ภาษาอังกฤษ',
}

enum Placeholder {
  en = 'Type something',
  th = 'พิมพ์บางอย่าง',
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [textField, setTextField] = useState('');
  const [translatedField, setTranslatedField] = useState('');
  const [translatingLanguage, setTranslatingLanguage] = useState(
    Language.english_en
  );
  const [translatedLanguage, setTranslatedLanguage] = useState(
    Language.thai_en
  );
  const [translatingSubLanguage, setTranslatingSubLanguage] = useState(
    Language.english_th
  );
  const [translatedSubLanguage, setTranslatedSubLanguage] = useState(
    Language.thai_th
  );
  const [placeholder, setPlaceholder] = useState(Placeholder.en);
  const [isLoading, setIsLoading] = useState(false);

  function submitTranslation() {
    Keyboard.dismiss();

    if (textField === '') {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setTranslatedField(
        'Translation is working properly, API can be handled now'
      );
      setIsLoading(false);
    }, 3000);
  }

  function swapLanguage() {
    switch (translatingLanguage) {
      case Language.english_en:
        setTranslatingLanguage(Language.thai_en);
        setTranslatedLanguage(Language.english_en);
        setTranslatingSubLanguage(Language.thai_th);
        setTranslatedSubLanguage(Language.english_th);
        setPlaceholder(Placeholder.th);
        break;
      case Language.thai_en:
        setTranslatingLanguage(Language.english_en);
        setTranslatedLanguage(Language.thai_en);
        setTranslatingSubLanguage(Language.english_th);
        setTranslatedSubLanguage(Language.thai_th);
        setPlaceholder(Placeholder.en);
        break;
      default:
        return;
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        <Card
          cardType='translating'
          textField={textField}
          setTextField={setTextField}
          submitTranslation={submitTranslation}
          language={translatingLanguage}
          subLanguage={translatingSubLanguage}
          placeholder={placeholder}
        />
        <TouchableOpacity style={styles.swapButton} onPress={swapLanguage}>
          <Ionicons name='swap-horizontal' size={20} color='#000' />
        </TouchableOpacity>
        <Card
          cardType='translated'
          textField={translatedField}
          setTextField={setTranslatedField}
          submitTranslation={submitTranslation}
          language={translatedLanguage}
          subLanguage={translatedSubLanguage}
          isLoading={isLoading}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
