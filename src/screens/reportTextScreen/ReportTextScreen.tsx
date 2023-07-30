import { useNavigation } from '@react-navigation/native';
import Button from '@src/components/commons/button/Button';
import Header from '@src/components/commons/header/Header';
import Label from '@src/components/commons/label/Label';
import { useTranslate } from '@src/context/languageContext';
import { updateIncidence } from '@src/redux/slices/incidenceSlice';
import { colors } from '@src/resources/styles/theme';
import { MAX_LENGHT_TAREA, navigationPages } from '@src/utils/constants';
import React, { useState } from 'react';
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

export default function ReportTextScreen() {
  const [title, onChangeTitle] = useState('') as any;
  const [description, setDescription] = useState('') as any;

  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const t = useTranslate();

  const gotoPhoto = () => {
    const objectToSave = {
      title: title,
      description: description,
    };
    dispatch(updateIncidence(objectToSave));
    navigation.navigate(navigationPages.reportPhoto);
  };

  const gotoBack = () => {
    navigation.navigate(navigationPages.main);
  };

  const checkEmptyValues = () => {
    return title === '' || description === '';
  };

  return (
    <SafeAreaView style={{flex: 1}}>
        <Header title={t('titol_reportText')} step={1} back={gotoBack} close />
        <ScrollView>
        <View style={stylesRT.textInfo}>
          <Label text={t('info1_reportText')} />
          <Label text="Primer hauràs d'escriure un assumpte i desprès afegir una breu descripció."/>
        </View>
        <KeyboardAvoidingView behavior={'padding'} style={stylesRT.containerForm}>
          <View>
            <Label text="Introdueix un assumpte:*" />
            <TextInput
              onChangeText={onChangeTitle}
              value={title}
              style={stylesRT.input1}
              />
              <Label text="Introdueix una descripció:*" />
            <TextInput
              editable
              multiline
              numberOfLines={7}
              maxLength={MAX_LENGHT_TAREA}
              onChangeText={text => setDescription(text)}
              value={description}
              style={stylesRT.input2}
            />
          </View>
        </KeyboardAvoidingView>
        </ScrollView>
        <View style={stylesRT.contentButton} >
          <Button text="Continuar" onPress={gotoPhoto} disabled={checkEmptyValues()} />
        </View>
    </SafeAreaView>
  );
}

const stylesRT = StyleSheet.create({
  textInfo: {
    paddingVertical: 10,
    paddingHorizontal: 10, marginHorizontal:7, borderRadius: 10, backgroundColor: '#FFFFFF', marginTop: 20,
  },
  containerForm: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    marginHorizontal:7,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 40,
  },
   input1: {
    borderColor: colors.text.primary,
    borderWidth: 1,
    color: colors.text.primary,
    marginBottom: 40,
    backgroundColor: 'white',
    borderRadius: 10,
   },
   input2: {
    borderColor: colors.text.primary,
    borderWidth: 1,
    color: colors.text.primary,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 40,
   },
   contentButton: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
     width: '100%',
    justifyContent: 'center',
   },
});
