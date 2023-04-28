import React from 'react';
import { StyleSheet, Dimensions, View, StyleProp, ViewStyle } from 'react-native';

export default function BackgroundModal({ style }: { style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.background, style]} />;
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(24, 27, 29, 0.2)',
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    zIndex: 500,
  },
});
