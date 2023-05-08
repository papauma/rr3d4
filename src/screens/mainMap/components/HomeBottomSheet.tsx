import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent';
import { mapStateMarkerSelected, updateMarkerSelected } from '@src/redux/slices/mapSlice';
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import MarkerDetails from './MarkerDetails';

export default function HomeBottomSheet() {
  const dispatch = useDispatch();
  const markerSelected = useSelector(mapStateMarkerSelected);  

  const snapPoints = useMemo(() => {
    return [100, 400];
  }, []);  

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
        enablePanDownToClose={false}
      >
        {markerSelected && (<MarkerDetails markerSelected={markerSelected} />)}
      </BottomSheetContent>
  )
}
