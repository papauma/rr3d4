import React from 'react';
import { View } from 'react-native';

export default function BottomButton({children}) {
  return (
    <View style={{position: 'absolute', bottom: 30, flexDirection: 'row', width: '100%', justifyContent: 'center'}} >
        {children}
    </View>
  );
}
