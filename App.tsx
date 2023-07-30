import ContextualComponents from '@src/components/widgets/ContextualComponents';
import { LanguageProvider } from '@src/context/languageContext';
import { store } from '@src/redux/store';
import Precarga from '@src/screens/Precarga';
import Routes from '@src/screens/Router';
import Splash from '@src/screens/splash/components/splash/Splash';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

export default function App() {
  const [precargaLoaded, setPrecargaLoaded] = useState(false);
  console.log('[App]');

  const finishPrecarga = () => {
    console.log('finishPrecarga()');
    setPrecargaLoaded(true);
  };
  return (
    <GestureHandlerRootView style={ {flex: 1} }>
        <LanguageProvider>
            <Provider store={store}>
              <Precarga onFinish={finishPrecarga}>
                    {!precargaLoaded ? (
                      <Splash/>
                      ) : (
                        <>
                        <Routes />
                      </>
                    )}
              </Precarga>
              <ContextualComponents />
            </Provider>
          </LanguageProvider>
    </GestureHandlerRootView>
  );
}
