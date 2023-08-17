import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

const logo = require('@images/splashImage.png');

export default function Splash() {
  return (
    <View style={stylesSplash.container} key="1">
      <Image source={logo} resizeMode="center" accessible={true} accessibilityLabel={'logo'} />
  </View>
  );
}

const stylesSplash = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
