import { colors } from '@src/resources/styles/theme';
import { IButton } from '@src/types/interfaces';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Button({text, onPress, disabled, style}: IButton) {
  let estiloBoton = new Array(stylesButton.button) as any;
  if (disabled) {
    estiloBoton.push(stylesButton.disabled);
  }
  if (style) {
    estiloBoton.push(style);
  }
  return (
    <View style={estiloBoton}>
      <TouchableOpacity onPress={!disabled ? onPress : undefined} disabled={disabled}>
          <Text style={stylesButton.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesButton = StyleSheet.create({
    button: {
     backgroundColor: colors.buttonAction,
     padding: 20,
     minWidth: 90,
     borderRadius: 6,
    },
    text: {
        color: colors.text.primary,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    disabled: {
      backgroundColor: colors.buttonAction,
      opacity: 0.5,

    },
 });
