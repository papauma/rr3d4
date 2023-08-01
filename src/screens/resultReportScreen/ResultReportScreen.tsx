import { useNavigation } from '@react-navigation/native';
import Header from '@src/components/commons/header/Header';
import { useTranslate } from '@src/context/languageContext';
import { incidenceState } from '@src/redux/slices/incidenceSlice';
import { colors } from '@src/resources/styles/theme';
import { INCIDENCES_LIST, INCIDENCES_NUM, navigationPages } from '@src/utils/constants';
import { getStorage } from '@src/utils/utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';


const iconCheck = require('@images/cheque.png');

export default function ResultReportScreen() {
    const navigation = useNavigation() as any;
    const storage = new MMKV();
    const selectorIncidence = useSelector(incidenceState);
    const t = useTranslate();


  const gotoMain = () => {
    navigation.navigate(navigationPages.main);
  };

  setTimeout(()=>{
    let storedIncidencesList = getStorage(INCIDENCES_LIST);
    storedIncidencesList.push(selectorIncidence);
    storage.set(INCIDENCES_LIST,  JSON.stringify(storedIncidencesList));

    let numIncidences = getStorage(INCIDENCES_NUM);

    numIncidences.numIncidencesToday = parseInt(numIncidences.numIncidencesToday) + 1;

    storage.set(INCIDENCES_NUM,  JSON.stringify(numIncidences));

    gotoMain();
  }, 6000);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title={t('confirmacio')} step={5} />
        <View style={stylesResult.containerInfo}>
            <Image source={iconCheck} style={stylesResult.imatge}/>
            <Text style={stylesResult.result}>{t('comunicacio_result')}</Text>
        </View>
    </SafeAreaView>
  );
}


const stylesResult = StyleSheet.create({
  containerInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    margin: 16,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imatge: {
    width: 128,
    height: 128,
    justifyContent: 'center',
  },
  result: {
    fontSize: 22,
    marginTop: 40,
    flexWrap: 'nowrap',
    width: '100%',
    textAlign: 'center',
    backgroundColor: colors.background.primary,
    borderRadius: 10,
    padding: 20,

  },
});
