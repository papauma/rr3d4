import { useTranslate } from '@src/context/languageContext';
import { colors } from '@src/resources/styles/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading(props: any) {
  const t = useTranslate();

    return (
    <View style={[stylesLoading.content, props.style?.content]}>
      <View style={[stylesLoading.box, props.style?.box]}>
        <View style={stylesLoading.row} accessible={true}>
          <ActivityIndicator
            size={'large'}
            color={colors.buttonAction}
          />
          <Text style={stylesLoading.text}>{t('carregant')}</Text>
        </View>
      </View>
    </View>
  );
}

const stylesLoading = StyleSheet.create({
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    box: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 250,
      height: 64,
      borderRadius: 16,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: '#CED4DA',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '600',

    },
  });
