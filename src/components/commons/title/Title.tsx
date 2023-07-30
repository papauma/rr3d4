import { colors } from '@src/resources/styles/theme';
import { ITitle } from '@src/types/interfaces';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function Title({text, styles}: ITitle) {
  let stilo = [stylesTitle.titulo] as any;
  if (styles) {
    stilo.push(styles);
  }
  return (
    <Text style={stilo}>{text}</Text>
  );
}

const stylesTitle = StyleSheet.create({
    titulo: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
  });
