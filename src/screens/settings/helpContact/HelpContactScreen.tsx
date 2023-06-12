import ScreenTitle from '@src/components/commons/text/ScreenTitle'
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext';
import React from 'react'
import { SafeAreaView } from 'react-native'

export default function HelpContactScreen() {
  const t = useTranslate();
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1}}>
        <ScreenTitle
            title={t('')}
        />
    </SafeAreaView>
  )
}
