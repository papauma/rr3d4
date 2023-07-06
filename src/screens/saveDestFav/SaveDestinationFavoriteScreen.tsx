import { useNavigation } from '@react-navigation/native';
import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent';
import Button from '@src/components/commons/buttons/Button';
import LocationButton from '@src/components/widgets/LocationButton';
import MapRender from '@src/components/widgets/MapRender';
import { useTheme } from '@src/context/themeContext';
import {mapStateRegion} from '@src/redux/slices/mapSlice';
import {defaultLocation} from '@src/utils/constants';
import React, {useState} from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import MapView from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

export default function SaveDestinationFavoriteScreen() {
  const [zoomMap, setZoomMap] = useState(13);
  const [refMapView, setRefMapView] = useState<MapView | undefined>();
  const regionMap = useSelector(mapStateRegion);
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{position: 'absolute',
            top: 0,
            width: Dimensions.get('window').width,
            zIndex: 10, padding: 16,}}>
        <SafeAreaView style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',}}>
            <Button
                icon={theme.drawables.general.Ic_Arrow_Left}
                buttonCategory='secondary'
                onPress={() => {
                    navigation.goBack()
                }}
            />
            <LocationButton/>
        </SafeAreaView>
      </View>
      <MapRender
        zoom={zoomMap}
        initialRegion={
          regionMap
            ? {
                latitude: regionMap.latitude,
                longitude: regionMap.longitude,
                latitudeDelta: defaultLocation.latitudeDelta,
                longitudeDelta: defaultLocation.longitudeDelta,
              }
            : defaultLocation
        }
        //markers={drawMarkers()}
        focus={() => {}}
        setRefMapView={(mapInstance: any) => {
          setRefMapView(mapInstance);
        }}
        location={selectorMap.location}
        updateZoom={(zoom: number) => {
          setZoomMap(zoom);
        }}
        updateBounds={(bounds: IBounds, zoom?: number) => {}}
      />
      <BottomSheetContent
        enablePanDownToClose={false}
        initial={0}
        snapPoints={[400]}
      >
        
      </BottomSheetContent>
    </SafeAreaView>
  );
}
