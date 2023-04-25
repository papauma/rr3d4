import { useNavigation } from '@react-navigation/native';
import { useSetLanguage, useTranslate } from '@src/context/languageContext';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

export default function LanguageScreen() {
    const setLanguage = useSetLanguage();
    const navigation = useNavigation();

    const t = useTranslate();


  return (
    <View>
      <Pressable onPress={() => {
        setLanguage('ca');
        navigation.goBack();
        }}>
            <Text>{t('language_catalan')}</Text>
        </Pressable>
        <Pressable onPress={() => {
            setLanguage('es');
            navigation.goBack();
            }}>
            <Text>{t('language_espanol')}</Text>
        </Pressable>
        <Pressable onPress={() => {
            setLanguage('en');
            navigation.goBack();
        }}>
            <Text>{t('language_ingles')}</Text>
        </Pressable>
    </View>
  );
}
