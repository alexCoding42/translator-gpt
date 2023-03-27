import 'dotenv/config';

// the secrets created with eas secret:create will
// be merged with process.env during eas builds
const apiKey = process.env.API_KEY;

export default {
  expo: {
    name: 'translator-gpt',
    slug: 'translator-gpt',
    version: '1.1.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.alexandrecisse.translatorGpt',
      buildNumber: '1.1.0',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
      package: 'com.alexandrecisse.translatorGpt',
      versionCode: 2,
    },
    web: {
      favicon: './assets/favicon.png',
    },
    extra: {
      eas: {
        projectId: 'ab2bb4d6-d635-4df8-8ecd-5ebe3bb976db',
      },
      apiKey: apiKey,
    },
  },
};
