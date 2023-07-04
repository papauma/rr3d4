import { useNavigation } from '@react-navigation/native'
import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent'
import Button from '@src/components/commons/buttons/Button'
import ErrorSnackBar from '@src/components/commons/feedback/ErrorSnackBar'
import Loading from '@src/components/commons/loading/Loading'
import BackgroundModal from '@src/components/commons/modal/BackgroundModal'
import LineDetailsBottomSheet from '@src/components/features/lineDetails/organisms/LineDetailsBottomSheet'
import LocationButton from '@src/components/widgets/LocationButton'
import MapRender from '@src/components/widgets/MapRender'
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext'
import InfoLineMapPresenter from '@src/redux/hooks/lineInfo/InfoLineMapPresenter'
import { contextualInformation, contextualSlice } from '@src/redux/slices/contextualSlice'
import { lineInfoPolyLineState, resetlineInfo } from '@src/redux/slices/lineInfoSlice'
import { mapState } from '@src/redux/slices/mapSlice'
import { IBounds } from '@src/types/interfaces'
import { defaultLocation } from '@src/utils/constants'
import React, { useEffect, useMemo, useState } from 'react'
import { Dimensions, SafeAreaView, View } from 'react-native'
import MapView from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'

interface InfoLineScreenProps {
    shareId?: number;
  }

export default function LineDetailsScreen(props: InfoLineScreenProps) {
  const contextualInfo = useSelector(contextualInformation);
  const theme = useTheme();
  const t = useTranslate();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const selectorMap = useSelector(mapState);
  const lineaState = useSelector(lineInfoPolyLineState)

  const [zoomMap, setZoomMap] = useState(13);
  const [refMapView, setRefMapView] = useState<MapView | undefined>();
  const [mapLoaded, setMapLoaded] = useState(false);

  const { drawPolylineLines, drawMarkers, drawCirclesLine } = InfoLineMapPresenter();

  const snapPoints = useMemo(() => {
    return [
      Dimensions.get('window').height * 0.22,
      Dimensions.get('window').height * 0.6,
      Dimensions.get('window').height * 0.85,
    ];
  }, []);

  useEffect(() => {
    if (lineaState.length > 0 && mapLoaded) {
      const puntoMitad = parseInt(lineaState[0].path.length / 2);
      refMapView?.animateCamera({
        center: {
          latitude:  lineaState[0].path[puntoMitad].latitude,
          longitude: lineaState[0].path[puntoMitad].longitude,
        },
        zoom: 11,
      });
    }
  }, [lineaState, mapLoaded])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{position: 'absolute',
            top: 0,
            width: Dimensions.get('window').width,
            zIndex: 10, padding: 16,}}>
        <SafeAreaView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <Button
                icon={theme.drawables.general.Ic_Arrow_Left}
                buttonCategory='secondary'
                onPress={() => {
                    dispatch(resetlineInfo())
                    navigation.goBack()
                }}
            />
            <LocationButton/>
        </SafeAreaView>
      </View>
      <MapRender
        zoom={zoomMap}
        initialRegion={defaultLocation}
        markers={drawMarkers()}
        focus={() => {}}
        setRefMapView={(mapInstance: any) => {setMapLoaded(true); setRefMapView(mapInstance)}}
        location={selectorMap.location}
        updateZoom={(zoom: number) => {
          setZoomMap(zoom);
        }}
        updateBounds={(bounds: IBounds, zoom?: number) => {}}
        polylines={drawPolylineLines(refMapView)}
        circles={drawCirclesLine()}
      />
      <BottomSheetContent
        enablePanDownToClose={false}
        initial={0}
        snapPoints={snapPoints}
      >
        <LineDetailsBottomSheet/>
      </BottomSheetContent>
      {contextualInfo.errorMessage.length > 0 && (
        <ErrorSnackBar
          message={contextualInfo.errorMessage}
          onPress={() => {
            dispatch(contextualSlice.actions.updateErrorMessage(''));
            navigation.goBack();
          }}
        />
      )}
    </SafeAreaView>
  )
}
