import { IButtonIcon } from '@src/types/interfaces';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ButtonIcon({onPress, icon, size, literalAccesible}: IButtonIcon) {
  return (
    <TouchableOpacity onPress={onPress}>
       <Image source={icon} style={stylesButtonIcon(size).image} accessible={true} accessibilityLabel={literalAccesible} />
    </TouchableOpacity>
  );
}


const stylesButtonIcon = (size: number | undefined) => StyleSheet.create({
    image: {
        width:  size ?? 22,
        height: size ?? 22,
    },
});
