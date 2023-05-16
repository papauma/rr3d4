import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent'
import React, { useMemo } from 'react'
import { View } from 'react-native';
import { Dimensions } from 'react-native';

export default function RouteDetailsBottomSheetContent() {
    const snapPoints = useMemo(() => {
        return [
          Dimensions.get('window').height * 0.22,
          Dimensions.get('window').height * 0.6,
          Dimensions.get('window').height * 0.7,
        ];
      }, []);

  return (
    <BottomSheetContent
        enablePanDownToClose={false}
        initial={0}
        snapPoints={snapPoints}
    >
        <View style={{ flex: 1 }}></View>
    </BottomSheetContent>
  )
}
