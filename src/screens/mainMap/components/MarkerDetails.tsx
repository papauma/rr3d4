import { BottomSheetScrollView, useBottomSheet } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import StopDetails from '@src/components/features/stopDetails/organisms/StopDetails';
import { plannerSegmentsSlice } from '@src/redux/slices/plannerSegmentsSlice';
import { TypeMarker } from '@src/types/ExploreInterfaces';
import { IMarker } from '@src/types/interfaces'
import { navigationPages } from '@src/utils/constants';
import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux';

interface MarkerDetailsProps {
    markerSelected?: IMarker;
}
export default function MarkerDetails(props: MarkerDetailsProps) {
  const bottomSheet = useBottomSheet();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function onPlan() {
    dispatch(plannerSegmentsSlice.actions.init({ origin: null, destination: props.markerSelected }))
    navigation.navigate(navigationPages.planner)
  }

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
            <StopDetails stop={props.markerSelected} onPlan={onPlan} />
        )}
      </BottomSheetScrollView>
    </View>
  )
}
