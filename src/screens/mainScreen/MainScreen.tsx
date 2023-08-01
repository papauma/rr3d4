import { useNavigation } from '@react-navigation/native';
import BottomButton from '@src/components/commons/bottomButton/BottomButton';
import ButtonHome from '@src/components/commons/buttonHome/ButtonHome';
import { useLanguage, useSetLanguage, useTranslate } from '@src/context/languageContext';
import { updateErrorMessage } from '@src/redux/slices/contextualSlice';
import { colors } from '@src/resources/styles/theme';
import { INCIDENCES_NUM, MAX_INCIDENCES_DAY, navigationPages } from '@src/utils/constants';
import { getStorage } from '@src/utils/utils';
import React, { useState } from 'react';
import { Image, ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

const imageBackground = require('@images/carrer.jpg');
const iconMenu = require('@images/menu.png');
const iconSettings = require('@images/settings.png');
const iconClose = require('@images/cerrar.png');


export default function MainScreen() {

  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const t = useTranslate();
  const locale = useLanguage();
  const setLanguage = useSetLanguage();
  let stylesBotonCat = [stylesMainSc.stylesButtonModal] as any;
  let stylesBotonCas = [stylesMainSc.stylesButtonModal] as any;
  if (locale === 'es') {
    stylesBotonCat.push(stylesMainSc.buttonModalActive);
    stylesBotonCas.push(stylesMainSc.buttonModalDisabled);
  } else {
    stylesBotonCat.push(stylesMainSc.buttonModalDisabled);
    stylesBotonCas.push(stylesMainSc.buttonModalActive);
  }

  const [modalVisible, setModalVisible] = useState(false);

  const gotoReport = () => {
    console.log('gotoreport()');
    const numIncidences = getStorage(INCIDENCES_NUM);
      if (parseInt(numIncidences.numIncidencesToday) >= MAX_INCIDENCES_DAY) {
        console.log('MAX PER DAY');
        const resultadoMessage = t('potsCom_main') + MAX_INCIDENCES_DAY + t('vegades_main');
        dispatch(updateErrorMessage(resultadoMessage));
      } else {
        console.log('gotoReport');
        navigation.navigate(navigationPages.reportText);
      }
    };

    const gotoList = () => {
        navigation.navigate(navigationPages.listReport);
    };

    const cerrarModal = () => {
      console.log('cerrar modal');
      setModalVisible(!modalVisible);
    };

    const optionModal = (idioma: string) => {
      console.log('optionModal');
      setLanguage(idioma);
      cerrarModal();
    };


  return (
    <SafeAreaView style={{flex: 1}}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cerrarModal}>
          <View style={stylesMainSc.centeredView}>
            <View style={stylesMainSc.modalView}>
            <TouchableOpacity style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%'}} onPress={cerrarModal}>
              <Image source={iconClose} style={stylesMainSc.imageModalClose}/>
            </TouchableOpacity>
            <Text style={stylesMainSc.modalText}>{t('canviIdioma_main')}</Text>
            <View style={stylesMainSc.containerButtonModal}>
              <TouchableOpacity onPress={()=>optionModal('ca')} style={stylesBotonCat} disabled={locale === 'ca'}>
                <Text style={{color: colors.text.primary}}>{t('canviIdiomaVal_main')}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>optionModal('es')} style={stylesBotonCas} disabled={locale === 'es'}>
                <Text style={{color: colors.text.primary}}>{t('canviIdiomCas_main')}</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>

      <View style={stylesMainSc.containerIconMenu}>
        <TouchableOpacity onPress={gotoList} >
          <Image source={iconMenu} style={stylesMainSc.iconMenu}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> setModalVisible(!modalVisible)} >
          <Image source={iconSettings} style={stylesMainSc.iconMenu}/>
      </TouchableOpacity>

      </View>
      <ImageBackground source={imageBackground} resizeMode="cover" style={stylesMainSc.image} />
      <View style={stylesMainSc.containerText}>
        <Text style={stylesMainSc.textAjudans}>{t('ajudans_main')}</Text>
        <Text style={stylesMainSc.textBenirre}>BENIRREDRÀ</Text>
        <Text style={stylesMainSc.textExplicacio}>{t('descripcio_main')}</Text>
      </View>
      <BottomButton>
        <ButtonHome text={t('queEns_main')} onPress={gotoReport} />
      </BottomButton>
    </SafeAreaView>
  );
}


const stylesMainSc = StyleSheet.create({
  image: {
    flex: 1,
  },
  containerText: {
    position: 'absolute',
    width: '100%',
    flex: 1,
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAjudans: {fontSize: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 10,
    color: colors.text.primary,
},
  textBenirre: {
    fontSize: 40,
    fontWeight: '900',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 10,
    marginTop: 5,
    color: colors.text.primary,
  },
  textExplicacio: {
    fontSize: 12,
    fontWeight: '900',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 10,
    marginTop: 20,
    textAlign: 'center',
    width: '75%',
    color: colors.text.primary,
  },
  containerIconMenu: {
    flex: 1,
    position: 'absolute',
     top: 30,
     right: 20,
     zIndex: 1,
     flexDirection: 'row',
     display: 'flex',
     gap: 10,
  },
  iconMenu: {
    width: 42,
    height: 42,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    zIndex: 999,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: colors.text.primary,
  },
  containerButtonModal: {
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    gap: 50,
  },
  stylesButtonModal: {
    borderRadius: 6,
    padding: 10,
  },
  buttonModalActive: {
    backgroundColor: colors.buttonAction,
  },
  buttonModalDisabled: {
    backgroundColor: colors.graySecundary,
  },
  imageModalClose: {
    width: 10,
    height: 10,
  },
});
