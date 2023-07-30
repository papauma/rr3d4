import { useTranslate } from '@src/context/languageContext';
import { colors } from '@src/resources/styles/theme';
import { IIncidence } from '@src/types/interfaces';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ItemIncidence(incidence: IIncidence) {

  const t = useTranslate();


  return (
    <View style={stylesItemIn.content}>
        <Text style={stylesItemIn.dataHour}>{incidence?.data} - {incidence?.time}</Text>
        <View style={stylesItemIn.containerItem}>
          <Image source={{uri: incidence?.image}} style={stylesItemIn.image}/>
          <View style={stylesItemIn.contentText}>
            <Text style={stylesItemIn.label}>{t('assumpte')}</Text>
            <Text style={stylesItemIn.value}>{incidence?.title}</Text>
            <Text style={stylesItemIn.label}>{t('descripcio')}</Text>
            <Text style={stylesItemIn.value}>{incidence?.description}</Text>
            <Text style={stylesItemIn.value}>{incidence?.type}</Text>
            <Text style={stylesItemIn.label}>{t('adreca')}</Text>
            <Text style={stylesItemIn.value}>{incidence?.address}</Text>
            <Text style={stylesItemIn.value}>({incidence?.location?.latitude}, {incidence?.location?.longitude})</Text>
          </View>
        </View>
    </View>
  );
}

const stylesItemIn = StyleSheet.create({
    content: {
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginBottom: 5,
    },
    containerItem : {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 20,
      width: '100%',
      flex: 1,
    },
    contentText: {
      flex: 1,
    },
    image : {
      width: 100,
      marginBottom: 20,
      borderRadius: 10,
      height: 100,
    },
    dataHour: {
      textAlign: 'right',
      fontSize: 10,
      color: colors.text.primary,
    },
    label: {
      fontWeight: 'bold',
      color: colors.text.primary,
      width: '100%',
      flexWrap: 'wrap',
    },
    value: {
      paddingLeft: 7,
      color: colors.text.primary,
      width: '100%',
      flexWrap: 'wrap',
    },
});
