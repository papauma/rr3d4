import { drawables } from '@resources/drawables';
import React from 'react';
import { View, Image } from 'react-native';
export default function Splash() {
  return (
    <View style={{flex: 1}} key="1">
      <Image source={drawables.splash.logo} resizeMode={'stretch'} />
  </View>
  );
}
