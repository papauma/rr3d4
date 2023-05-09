import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent';
import { mapStateMarkerSelected, updateMarkerSelected } from '@src/redux/slices/mapSlice';
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MarkerDetails from './MarkerDetails';
import InfoMapUtils from '@src/utils/InfoMapUtils';

export default function HomeBottomSheet() {
  const dispatch = useDispatch();
  const markerSelected = useSelector(mapStateMarkerSelected);  

  const snapPoints = useMemo(() => {
    return InfoMapUtils.getSnapPoint(markerSelected?.markerType)
  }, [markerSelected]);  

  return (
    <BottomSheetContent
        initial={0}
        snapPoints={snapPoints}
        onChange={(index) => {
          if (index < 0) {
            /* dispatch(
              bottomsheetHomeSlice.actions.updateShowInTheBottom(TypeShowInBottomsheetHome.Empty),
            ); */
            dispatch(updateMarkerSelected(null));
          }
        }}
        enablePanDownToClose={true}
      >
        <MarkerDetails markerSelected={markerSelected} />
      </BottomSheetContent>
  )
}
