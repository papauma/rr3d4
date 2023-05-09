import { BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet';
import StopDetails from '@src/components/features/stopDetails/organisms/StopDetails';
import { TypeMarker } from '@src/types/ExploreInterfaces';
import { IMarker } from '@src/types/interfaces'
import React, { useEffect } from 'react'
import { View } from 'react-native'

interface MarkerDetailsProps {
    markerSelected?: IMarker;
}
export default function MarkerDetails(props: MarkerDetailsProps) {
  const bottomSheet = useBottomSheet();

  useEffect(() => {
    if (props.markerSelected) {
      bottomSheet.snapToIndex(1);
    } else {
      bottomSheet.close();
    }
  }, [props.markerSelected])

  return (
    <View style={{flex: 1, padding: 16}}>
      <BottomSheetScrollView>
        {props.markerSelected?.markerType === TypeMarker.Stop && (
            <StopDetails stop={props.markerSelected} />
        )}
      </BottomSheetScrollView>
    </View>
  )
}
