import { drawables } from '@resources/drawables';
import { useTheme } from '@src/context/themeContext';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
export default function Splash() {
  const theme = useTheme();
  return (
    <View style={stylesSplash(theme).container} key="1">
      <Image source={drawables.splash.logo} resizeMode="center" />
  </View>
  );
}

const stylesSplash = (theme: any) =>
StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
