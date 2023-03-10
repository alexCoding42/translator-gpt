import { StatusBar } from 'expo-status-bar';
import 'expo-dev-client';

import HomeScreen from './src/screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='TranslatorGPT' component={HomeScreen} />
        </Stack.Navigator>
        <StatusBar style='auto' />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
