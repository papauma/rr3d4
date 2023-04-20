import Routes from '@src/screens/Router';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '@src/redux/store';
import { LanguageProvider } from '@src/context/languageContext';
import Precarga from '@src/screens/Precarga';
import { ThemeProvider } from '@src/context/themeContext';

export default function App() {
  const [precargaLoaded, setPrecargaLoaded] = useState(false);
  console.log('[App]');

  const finishPrecarga = () => {
    console.log('finishPrecarga()');
    setPrecargaLoaded(true);
  };
  return (
    <GestureHandlerRootView style={ {flex: 1} }>
      <ThemeProvider>
        <LanguageProvider>
            <Provider store={store}>
              <StatusBar barStyle={'dark-content'} />
              {!precargaLoaded ? (
                <Precarga onFinish={finishPrecarga} />
              ) : (
                <>
                  <Routes />
                </>
              )}
            </Provider>
          </LanguageProvider>
        </ThemeProvider>
    </GestureHandlerRootView>
  );
}
