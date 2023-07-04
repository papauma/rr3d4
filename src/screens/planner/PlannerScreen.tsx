import { useNavigation } from '@react-navigation/native';
import Button from '@src/components/commons/buttons/Button';
import Loading from '@src/components/commons/loading/Loading';
import BackgroundModal from '@src/components/commons/modal/BackgroundModal';
import PlannerHeader from '@src/components/features/planner/definition/organisms/PlannerHeader';
import LocationButton from '@src/components/widgets/LocationButton';
import MapRender from '@src/components/widgets/MapRender';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import PlannerMapPresenter from '@src/redux/hooks/map/PlannerMapPresenter';
import usePlannerInfo from '@src/redux/hooks/planner/usePlannerInfo';
import useSearch from '@src/redux/hooks/search/useSearch';
import { contextualInformation } from '@src/redux/slices/contextualSlice';
import { mapState, updateZoom } from '@src/redux/slices/mapSlice';
import { plannerSegmentsInformation } from '@src/redux/slices/plannerSegmentsSlice';
import { IBounds, IMarker } from '@src/types/interfaces';
import GeoUtils from '@src/utils/GeoUtils';
import { defaultLocation, navigationPages } from '@src/utils/constants';
import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function PlannerScreen() {
  const selectorMap = useSelector(mapState);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const contextual = useSelector(contextualInformation);
  const segmentsChanged = useSelector(plannerSegmentsInformation)
  const theme = useTheme();
  const t = useTranslate();
  const {drawPlannerMarkers, onDragMarker, onLongPressOnThePlannerMap, drawPolyline} = PlannerMapPresenter();
  const {onPlannerSegmentChange, allSegmentsHaveValue} = usePlannerInfo();
  const [refMapView, setRefMapView] = useState<MapView | undefined>()

  useEffect(() => {
    let mounted = true;
    if (
      mounted &&
      segmentsChanged.length === 2 &&
      segmentsChanged[0] &&
      !segmentsChanged[segmentsChanged.length - 1]
    ) {
      console.log('Centrado en origen', segmentsChanged[0].location);
      focus(segmentsChanged[0]);
    } else if (
      mounted &&
      segmentsChanged.length === 2 &&
      !segmentsChanged[0] &&
      segmentsChanged[segmentsChanged.length - 1]
    ) {
      focus(segmentsChanged[segmentsChanged.length - 1]);
    } else if (
      mounted &&
      segmentsChanged.length > 1 &&
      segmentsChanged[0] &&
      segmentsChanged[segmentsChanged.length - 1]
    ) {
      focus(
        GeoUtils.calculateMeanPoint(
          segmentsChanged[segmentsChanged.length - 1],
          segmentsChanged[0],
        ),
        GeoUtils.getMidZoom(
          segmentsChanged[segmentsChanged.length - 1]?.position,
          segmentsChanged[0]?.position,
        ),
        GeoUtils.getMidZoom(
          segmentsChanged[segmentsChanged.length - 1]?.position,
          segmentsChanged[0]?.position,
        ) - 1,
      );
    }
    return () => (mounted = false);
  }, [segmentsChanged]);

  function focus(point: IMarker, altitude?: any, zoomlevel?: any) {
    if (refMapView) {
      //dispatch(updateLocation(coords));
      refMapView?.animateCamera({
        center: point.position,
        zoom: zoomlevel ?? 17,
        altitude: altitude ?? 2500,
      });
    } else {

    }
  }

  return (
    <SafeAreaView style={{flex: 1}}>
       <MapRender
        zoom={13}
        initialRegion={selectorMap.region ?? defaultLocation}
        markers={drawPlannerMarkers()}
        focus={() => {}}
        setRefMapView={setRefMapView}
        //showButtonFocus={selectorPermission.PermissionGeolocation}
        location={selectorMap.location}
        //drawListenerMarkers={[selectorMap.drawMarkers]}
        updateZoom={(zoom: number) => {
          dispatch(updateZoom(zoom));
        }}
        onLongPress={onLongPressOnThePlannerMap}
        updateBounds={(bounds: IBounds, zoom?: number) => {}}
        polylines={drawPolyline()}
        onDragEnd={onDragMarker}
        draggableMarkers={true}
        //layerSelected={selectedLayer}
      /> 
      <View
        style={{
          top: 0,
          position: 'absolute',
          width: '100%',
          //alignItems: 'center',
          //justifyContent: 'center',
        }}
      >
        <View style={{backgroundColor: theme.colors.gray_200,
          paddingTop: Platform.OS === 'ios' ? 0 : 16,
          paddingBottom: 16,}}>
            <SafeAreaView style={{display: 'flex'}}>
                <PlannerHeader notShowBackButton={true}/>
        </SafeAreaView>
        </View>
        <View style={{alignSelf: 'flex-end', marginTop: 35, marginRight: 16}}>
                <LocationButton/>
        </View>
      </View>

      <View
        style={[
          { padding: 16, bottom: 0, position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', },
          Platform.OS === 'ios' ? { paddingBottom: 24 } : null,
        ]}
      >
        <Button
            title={t('planner_button_calculate')}
            icon={theme.drawables.general.Ic_Plan}
            buttonSizeStyle='medium'
            style={{alignSelf: 'center'}}
            disabled={!allSegmentsHaveValue()}
            onPress={() => {
            onPlannerSegmentChange((res) => {
              navigation.navigate(navigationPages.plannerResult, { plan: res });
            });
          }}
        />
      </View>
    </SafeAreaView>
  )
}
