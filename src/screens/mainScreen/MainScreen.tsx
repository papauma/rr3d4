import { useNavigation } from '@react-navigation/native';
import BottomButton from '@src/components/commons/bottomButton/BottomButton';
import ButtonHome from '@src/components/commons/buttonHome/ButtonHome';
import ButtonSecondary from '@src/components/commons/buttonSecondary/ButtonSecondary';
import { useTranslate } from '@src/context/languageContext';
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

export default function MainScreen() {

  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const t = useTranslate();
  const [modalVisible, setModalVisible] = useState(false);

  const gotoReport = () => {
    console.log('gotoreport()');
    const numIncidences = getStorage(INCIDENCES_NUM);
      if (parseInt(numIncidences.numIncidencesToday) >= MAX_INCIDENCES_DAY) {
        console.log('MAX PER DAY');
        dispatch(updateErrorMessage('Pots comunicar fins a un total de ' + MAX_INCIDENCES_DAY + ' vegades per dia.'));
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

  return (
    <SafeAreaView style={{flex: 1}}>

<Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={cerrarModal}>
          <View style={stylesMainSc.centeredView}>
          <View style={stylesMainSc.modalView}>
            <Text style={stylesMainSc.modalText}>{t('canviIdioma_main')}</Text>
            <TouchableOpacity
              onPress={cerrarModal}>
                <Text>{t('canviIdiomaVal_main')}</Text>
                </TouchableOpacity>

              <TouchableOpacity
              onPress={cerrarModal}>
                <Text>{t('canviIdiomCas_main')}</Text>
                </TouchableOpacity>
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
  textBenirre: {fontSize: 45,
    fontWeight: '900',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  paddingHorizontal: 10,
  marginTop: 5,
  color: colors.text.primary,
},
  textExplicacio: {fontSize: 12,
    fontWeight: '900',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  paddingHorizontal: 10,
  marginTop: 15,
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
    padding: 35,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    color: colors.text.primary,
  },
});
