/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { ThemeProvider } from '@tallo/themes';
import { RootNavigator } from '@tallo/navigation';
// import '../shared-libs/translations/i18n/i18n';
import '@tallo/translations/i18n/i18n';
import { useTranslation } from 'react-i18next';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { findBestLanguageTag } from 'react-native-localize';
type SectionProps = PropsWithChildren<{
  title: string;
}>;

type findBestLanguageTag = (languageTags: string[]) => { languageTag: string; isRTL: boolean } | void;

function App(): React.JSX.Element {

  const { i18n } = useTranslation();
  const fallback = { languageTag: 'en', isRTL: false };
  const { languageTag } = findBestLanguageTag(['en', 'es']) || fallback;
  i18n.changeLanguage(languageTag);


  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>

          <RootNavigator />
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}



export default App;
