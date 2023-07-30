import { colors } from '@src/resources/styles/theme';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
export default function Label({text}) {
  return (
      <Text style={stylesLabel.text}>{text}</Text>
  );
}

const stylesLabel = StyleSheet.create({
    text: {
     color: colors.text.primary,
    },
 });
