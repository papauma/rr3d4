import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultLocation} from '@src/utils/constants';
import MapRender from '@src/components/widgets/MapRender';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {useTranslate} from '@src/context/languageContext';
import HomeHeader from './components/HomeHeader';
import {useDispatch, useSelector} from 'react-redux';
import {contextualInformation} from '@src/redux/slices/contextualSlice';
import BackgroundModal from '@src/components/commons/modal/BackgroundModal';
import MapView from 'react-native-maps';
import {IBounds, IPosition} from '@src/types/interfaces';
import {stopsState} from '@src/redux/slices/stopsSlices';
import VisualizerMapPresenter from '@src/redux/hooks/VisualizerMapPresenter';
import {
  mapStateBounds,
  mapStateMarkerSelected,
  mapStateMarkers,
  mapStateRegion,
  mapStateZoom,
  updateBounds,
  updateRegion,
  updateZoom,
} from '@src/redux/slices/mapSlice';
import HomeBottomSheet from './components/HomeBottomSheet';
import {filtersState} from '@src/redux/slices/filtersSlice';
import Loading from '@src/components/commons/loading/Loading';
import {useIsFocused} from '@react-navigation/native';

export default function MainMapScreen() {
  console.log('[MainMapScreen]');
  const theme = useTheme();
  const t = useTranslate();
  const dispatch = useDispatch();
  const [trackingMap, setTrackingMap] = useState(false);
  let isFocused = useIsFocused();

  const contextualInfo = useSelector(contextualInformation);
  const allStops = useSelector(stopsState);
  const selectorMapBounds = useSelector(mapStateBounds);
  const selectedMarker = useSelector(mapStateMarkerSelected);
  const selectorMapZoom = useSelector(mapStateZoom);
  const markersVisualizer = useSelector(mapStateMarkers);
  const selectorFilters = useSelector(filtersState);
  const regionCenter = useSelector(mapStateRegion);

  const {getMarkers, renderVisualizerMarkers} = VisualizerMapPresenter();
  console.log('Stops', allStops.length);

  const [refMapView, setRefMapView] = useState<MapView | undefined>();

  /**
   * Gestión de los marcadores
   */
  useEffect(() => {
    async function loadMarkers() {
      getMarkers(selectorMapBounds, selectorMapZoom);
    }
    loadMarkers();
  }, [selectorMapBounds, selectorMapZoom, selectorFilters]);

  /**
   *  Gestión de trackear los cambios de los iconos de los marcadores
   * */
  useEffect(() => {
    if (selectedMarker) {
      selectedMarker.position && focusOnTheMap(selectedMarker.position);
    }
    setTrackingMap(true);
    setTimeout(() => setTrackingMap(false), 100);
  }, [selectorFilters, selectedMarker]);

  function focusOnTheMap(coords: any) {
    if (refMapView) {
      //dispatch(updateLocation(coords));
      refMapView?.animateCamera({
        center: coords,
        zoom: 17,
        altitude: 2500,
      });
      setTrackingMap(true);
      setTimeout(() => setTrackingMap(false), 500);
    } else {
    }
  }

  console.log('Markers: ', markersVisualizer?.length);

  return (
    <SafeAreaView style={{flex: 1}}>
      {contextualInfo.showBackground && <BackgroundModal />}
      {contextualInfo.showLoading && <Loading />}
      <HomeHeader
        onPressLocation={(coords: IPosition) => focusOnTheMap(coords)}
      />
      <MapRender
        zoom={13}
        initialRegion={defaultLocation}
        setRefMapView={setRefMapView}
        onMapDragComplete={(region: any) =>
          dispatch(
            updateRegion({
              latitude: parseFloat(region.latitude.toFixed(6)),
              longitude: parseFloat(region.longitude.toFixed(6)),
            }),
          )
        }
        markers={isFocused ? renderVisualizerMarkers(markersVisualizer) : []}
        updateBounds={(bounds: IBounds) => {
          dispatch(updateBounds(bounds));
        }}
        updateZoom={(zoom: number) => {
          console.log('[HomeScreen] updateZoom map');
          dispatch(updateZoom(zoom));
        }}
        setTrackViewChanges={trackingMap}
        disableTooltip={true}
      />
      <HomeBottomSheet
        center={selectorMapZoom > 15 ? regionCenter : null}
        zoom={selectorMapZoom}
        bounds={selectorMapBounds}
      />
    </SafeAreaView>
  );
}

const styles = (theme: ThemeProps) => StyleSheet.create({});
