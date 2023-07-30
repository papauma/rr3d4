import { useNavigation } from '@react-navigation/native';
import { PHOTO_NAME, navigationPages } from '@src/utils/constants';
import React, { useState } from 'react';

import BottomButton from '@src/components/commons/bottomButton/BottomButton';
import Button from '@src/components/commons/button/Button';
import ButtonCapture from '@src/components/commons/buttonCapture/ButtonCapture';
import ButtonIcon from '@src/components/commons/buttonIcon/ButtonIcon';
import GrillComponent from '@src/components/commons/grillComponent/GrillComponent';
import Header from '@src/components/commons/header/Header';
import { incidenceState, updateIncidence } from '@src/redux/slices/incidenceSlice';
import { colors } from '@src/resources/styles/theme';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import RNFS from 'react-native-fs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import { useTranslate } from '@src/context/languageContext';

const imageFolder = require('@images/folder.png');
const imageRotate = require('@images/actualizar.png');
const imageDescartar = require('@images/cerrar.png');

export default function ReportPhotoScreen() {
  const navigation = useNavigation() as any;
  const t = useTranslate();
  const [image, setImage] = useState(null) as any;
  const selectorIncidence = useSelector(incidenceState);
  const [typeCam, setTypeCam] = useState(RNCamera.Constants.Type.back);
  const filePath = RNFS.DocumentDirectoryPath + '/' + PHOTO_NAME;
  const dispatch = useDispatch();
  let camera = null as any;

  const gotoMap = () => {
    if (selectorIncidence.image === null || selectorIncidence.image === undefined) {
      const objectToSave = {
        image: image,
      };
      dispatch(updateIncidence(objectToSave));
      RNFS.moveFile(image, filePath)
      .then(() => {
        console.log('Imagen guardada correctamente');
        navigation.navigate(navigationPages.reportMap);
      })
      .catch(error => {
        console.log('Error al guardar la imagen: ', error);
      });
    } else {
      console.log('Imagen ya estaba');
      navigation.navigate(navigationPages.reportMap);
    }
};

  const handleCapture = async () => {
    if (camera) {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
      setImage(data.uri);
    }
  };

  const rotateCam = () => {
    if (typeCam === RNCamera.Constants.Type.back) {
      setTypeCam(RNCamera.Constants.Type.front);
    } else {
      setTypeCam(RNCamera.Constants.Type.back);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      }) as any;
      console.log('PICKER');
      console.log(result);
      setImage(result[0].uri);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // El usuario canceló la selección
        console.log('Error al guardar la imagen: ', error);
      } else {
        // Ocurrió un error
        console.log('No se pudo seleccionar ', error);
      }
    }
  };


  const gotoBack = () => {
    navigation.navigate(navigationPages.reportText);
  };
  console.log(image);

  return (
    <SafeAreaView style={{flex: 1}}>
        <Header title={t('afegeix_reportPhoto')} step={2} back={gotoBack} close />
        {!image ?
        <View style={{flex: 1}}>
          <RNCamera
            ref={ref => {
              camera = ref;
            }}
            style={stylesPhotoSc.container}
            type={typeCam}
          >
            <GrillComponent />
            <View style={stylesPhotoSc.botoneraCam}>
              <ButtonIcon icon={imageFolder} size={45} onPress={pickDocument} />
              <ButtonCapture onPress={handleCapture} />
              <ButtonIcon icon={imageRotate} size={35} onPress={rotateCam}/>
            </View>
          </RNCamera>
        </View>
      : <View style={{flex: 1, padding: 16}}>
          <Image source={{uri: image}} style={stylesPhotoSc.preview} />
          <View>
            <TouchableOpacity onPress={()=>setImage(null)} style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, justifyContent: 'flex-end', gap: 5}}>
              <Image source={imageDescartar} style={{width: 18, height: 18, borderColor: colors.text.primary, borderWidth: 1, borderRadius: 18}} />
              <Text style={{textAlign: 'right', fontWeight: 'bold'}}>Descartar esta imatge</Text>
            </TouchableOpacity>
          </View>
          <BottomButton>
            <Button text={t('utilitzar_reportPhoto')} onPress={gotoMap} />
          </BottomButton>
        </View>}
    </SafeAreaView>

  );
}

const stylesPhotoSc = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: '100%',
    width: '100%',
  },
  preview: {
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  botoneraCam: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    width: '70%',
    opacity: 0.6,
  },
  opacity: {
  },
});
