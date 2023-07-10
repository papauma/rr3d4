import {useNavigation} from '@react-navigation/native';
import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent';
import Button from '@src/components/commons/buttons/Button';
import Icon from '@src/components/commons/icon/Icon';
import SaveDestinationBottomsheet from '@src/components/features/favorites/organisms/SaveDestinationBottomsheet';
import LocationButton from '@src/components/widgets/LocationButton';
import MapRender from '@src/components/widgets/MapRender';
import {useTheme} from '@src/context/themeContext';
import {mapStateRegion, updateRegion} from '@src/redux/slices/mapSlice';
import {defaultLocation} from '@src/utils/constants';
import React, {useState} from 'react';
import {Dimensions, SafeAreaView, View} from 'react-native';
import MapView from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';

export default function SaveDestinationFavoriteScreen() {
  const [zoomMap, setZoomMap] = useState(17.5);
  const [refMapView, setRefMapView] = useState<MapView | undefined>();
  const regionMap = useSelector(mapStateRegion);

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          width: Dimensions.get('window').width,
          zIndex: 10,
          padding: 16,
        }}>
        <SafeAreaView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Button
            icon={theme.drawables.general.Ic_Arrow_Left}
            buttonCategory="secondary"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <LocationButton />
        </SafeAreaView>
      </View>
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 250,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
        pointerEvents={'none'}>
        <Icon
          source={theme.drawables.general.Ic_Location_blue}
          tint={theme.colors.primary_300}
          style={{width: 32, height: 32}}
        />
      </View>
      <MapRender
        zoom={zoomMap}
        mapPadding={{top: 0, bottom: 250, left: 0, right: 0}}
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
        location={regionMap}
        updateZoom={(zoom: number) => {
          setZoomMap(zoom);
        }}
        onMapDragComplete={(region: any) => dispatch(
          updateRegion({
            latitude: parseFloat(region.latitude.toFixed(6)),
            longitude: parseFloat(region.longitude.toFixed(6)),
          }),
        )}
        updateBounds={(bounds: IBounds, zoom?: number) => {}}
      />
      <BottomSheetContent
        enablePanDownToClose={false}
        initial={0}
        snapPoints={[400]}>
        <SaveDestinationBottomsheet />
      </BottomSheetContent>
    </SafeAreaView>
  );
}
