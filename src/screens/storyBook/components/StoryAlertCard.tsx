import React from 'react'
import { View } from 'react-native'
import { useTheme } from '@src/context/themeContext'
import AlertCollapsableCard from '@src/components/commons/accordion/AlertCollapsableCard';

export default function StoryAlertCard() {
    const theme = useTheme();

  return (
    <View style={{flex: 1}}>
        <AlertCollapsableCard
            title='Línea desviada'
            description='A partir del lunes se pondrá en marcha na nueva ñínea circular, que unirá el centro...'
            linkPdf='google.es'
            
        />
    </View>
  )
}