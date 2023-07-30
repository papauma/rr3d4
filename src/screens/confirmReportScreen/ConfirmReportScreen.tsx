import { useNavigation } from '@react-navigation/native';
import BottomButton from '@src/components/commons/bottomButton/BottomButton';
import Button from '@src/components/commons/button/Button';
import Header from '@src/components/commons/header/Header';
import useMail from '@src/redux/hooks/useMail/useMail';
import { resetContextual, updateErrorMessage, updateShowLoading } from '@src/redux/slices/contextualSlice';
import { incidenceState, updateIncidence } from '@src/redux/slices/incidenceSlice';
import { colors } from '@src/resources/styles/theme';
import { navigationPages } from '@src/utils/constants';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';


export default function ConfirmReportScreen() {
    const navigation = useNavigation() as any;
    const dispatch = useDispatch();
    const selectorIncidence = useSelector(incidenceState);

  const enviarMail = () => {
    dispatch(updateShowLoading(true));
    const date = new Date();
    const dia = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + String(date.getFullYear());
    const hora = String(date.getHours()).padStart(2, '0') + ':' + String(date.getMinutes()).padStart(2, '0');
    const objectToSave = {
        data: dia,
        time: hora,
    };
    dispatch(updateIncidence(objectToSave));
    console.log('enviarMail');
    sendEmail(selectorIncidence, callbackOK, callbackKO);
  };

  const gotoMain = () => {
    navigation.navigate(navigationPages.main);
  };

  const gotoBack = () => {
    navigation.navigate(navigationPages.reportMap);
  };

  const callbackOK = () => {
    console.log('callbackOK()');
    navigation.navigate(navigationPages.result);
    dispatch(updateShowLoading(false));
  };
  const callbackKO = () => {
    console.log('callbackKO()');
    dispatch(updateShowLoading(false));
    dispatch(updateErrorMessage('Incidència reportada correctament.'));
    setTimeout(()=> {
      dispatch(resetContextual());
      gotoMain();
    }, 5000);
  };
  const [sendEmail] = useMail();
  return (
    <SafeAreaView style={{flex: 1}}>
      <Header title="Confirmar" step={4} back={gotoBack} close />
        <View style={stylesResult.containerInfo}>
            <Text style={stylesResult.label}>Assumpte:</Text>
            <Text style={stylesResult.value}>{selectorIncidence.title}</Text>
            <Text style={stylesResult.label}>Descripció:</Text>
            <Text style={stylesResult.value}>{selectorIncidence.description}</Text>
            <Text style={stylesResult.label}>Adreça:</Text>
            <Text style={stylesResult.value}>{selectorIncidence?.address}</Text>
            <Text style={stylesResult.value}>({selectorIncidence?.location?.latitude}, {selectorIncidence?.location?.longitude})</Text>
            <Image source={{uri: selectorIncidence.image}} style={stylesResult.imatge}/>
        </View>
      <BottomButton>
        <Button text="Confirmar"onPress={enviarMail} />
      </BottomButton>
    </SafeAreaView>
  );
}


const stylesResult = StyleSheet.create({
  containerInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    margin: 16,
  },
  imatge: {
    width: 350,
    height: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  map: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  value: {
    paddingLeft: 7,
    marginBottom: 15,
  },
});
