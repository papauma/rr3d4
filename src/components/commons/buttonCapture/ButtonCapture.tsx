import { IButton } from '@src/types/interfaces';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ButtonCapture({onPress}: IButton) {
  return (
    <TouchableOpacity onPress={onPress}>
       <View style={stylesButtonCap.container}>
        <View style={stylesButtonCap.circle} />
        </View>
    </TouchableOpacity>
  );
}


const stylesButtonCap = StyleSheet.create({
    container: {
        width: 90,
        height: 90,
        borderColor: '#FFFFFF',
        borderWidth: 3,
        borderRadius: 90,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    circle: {
        width: 70,
        height: 70,
        backgroundColor: '#FFFFFF',
        borderRadius: 70,
    },
});
