import { colors } from '@src/resources/styles/theme';
import { IButtonHome } from '@src/types/interfaces';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ButtonHome({text, onPress}: IButtonHome) {
  return (
    <TouchableOpacity onPress={onPress} style={stylesButtH.button}>
        <Text style={stylesButtH.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const stylesButtH = StyleSheet.create({
    button: {
     backgroundColor: colors.buttonAction,
     minWidth: 90,
     justifyContent: 'center',
     alignItems: 'center',
     padding: 20,
     borderRadius: 12,
     flexWrap: 'wrap',
    },
    text: {
      color: colors.text.primary,
      fontWeight: '900',
      fontSize: 18,
    },
 });
