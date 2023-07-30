import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
import Title from '../title/Title';
import BreadCrumb from '@src/components/widgets/breadCrumb/BreadCrumb';
import { IHeader } from '@src/types/interfaces';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { navigationPages } from '@src/utils/constants';

const iconBack = require('@images/atras.png');
const iconClose = require('@images/cerrar.png');

export default function Header({title, step, back, close}: IHeader) {

    const navigation = useNavigation() as any;

  return (
    <View style={stylesHeader.container}>
      <View style={stylesHeader.titleBack}>
      {back !== null && back !== undefined ?
        <TouchableOpacity onPress={back}>
            <Image source={iconBack} style={stylesHeader.image}/>
        </TouchableOpacity> : <></>}
        <Title text={title} styles={!back ? [stylesHeader.soloTitulo] : []}/>
        {close ? <TouchableOpacity onPress={ () => navigation.navigate(navigationPages.main)}>
            <Image source={iconClose} style={stylesHeader.image}/>
        </TouchableOpacity> : <></>}
       </View>
      <BreadCrumb step={step} />
    </View>
  );
}

const stylesHeader = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    titleBack: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: 22,
        height: 22,
    },
    soloTitulo: {
      textAlign: 'center',
      flex: 1,
    },
});
