import Constants from 'expo-constants';
import axios from 'axios';
import { BASE_URL, COMPLETIONS_ENDPOINT } from '../constants/endpoints';

export async function callChatGPTAPI(
  selectedLanguage: string,
  textToTranslate: string,
  needRomanizedTranslation: boolean
) {
  const apiKey = Constants?.expoConfig?.extra?.apiKey;
  const apiUrl = BASE_URL + COMPLETIONS_ENDPOINT;

  const response = await axios.post(
    apiUrl,
    {
      model: 'text-davinci-003',
      prompt: needRomanizedTranslation
        ? `Translate into ${selectedLanguage} and romanized translation into parenthesis: ${textToTranslate}`
        : `Translate into ${selectedLanguage}: ${textToTranslate}`,
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
