/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  //SafeAreaView,

  StyleSheet,
  //Text,
  useColorScheme,
} from 'react-native';
import {RootNavigator} from '@tallo/navigation'

import { ThemeProvider } from '@tallo/themes';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
		<SafeAreaProvider>
		<NavigationContainer onReady={() => {
			console.log('onReady', );
			return ;
		}} >


			<ThemeProvider>
      <RootNavigator />
			</ThemeProvider>
		</NavigationContainer>
		</SafeAreaProvider>
  );
}
export default App;