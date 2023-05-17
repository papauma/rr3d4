import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import RouteDetailsBottomSheetContent from '@src/components/features/planner/routeDetails/organisms/RouteDetailsBottomSheetContent';
import LocationButton from '@src/components/widgets/LocationButton';
import MapRender from '@src/components/widgets/MapRender';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import PlannerMapPresenter from '@src/redux/hooks/map/PlannerMapPresenter';
import { contextualInformation } from '@src/redux/slices/contextualSlice';
import { mapState } from '@src/redux/slices/mapSlice';
import { plannerSegmentsInformation } from '@src/redux/slices/plannerSegmentsSlice';
import { plannerInformation } from '@src/redux/slices/plannerSlice';
import { TypeRouteFilter } from '@src/types/PlannerInterfaces';
import { IBounds } from '@src/types/interfaces';
import GeoUtils from '@src/utils/GeoUtils';
import RouteUtils from '@src/utils/RouteUtils';
import { defaultLocation } from '@src/utils/constants';
import React, { useEffect, useState } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function RouteDetailsScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const t = useTranslate();
    const theme = useTheme()
    const selectorMap = useSelector(mapState);
    const plannerSegments = useSelector(plannerSegmentsInformation);
    const contextual = useSelector(contextualInformation);

    const firstPosition = plannerSegments[0] 
      && plannerSegments[plannerSegments.length - 1] 
      ? GeoUtils.calculateMeanPoint(plannerSegments[0], plannerSegments[plannerSegments.length - 1])?.position
      : defaultLocation;
    const plannerInfo = useSelector(plannerInformation);
    const planSelected = plannerInfo.selectedPlan;
    const routeTypeFilter = plannerInfo.routeTypeFilter;
    let parsedPlan = RouteUtils.getRoutesInfo(plannerInfo.plannerResult, plannerSegments);
    parsedPlan = RouteUtils.sortRoutes(
      parsedPlan,
      routeTypeFilter === TypeRouteFilter.FAST
        ? 'duration'
        : routeTypeFilter === TypeRouteFilter.TRANSFER
        ? 'transhipments'
        : 'walkDistance',
      'asc',
    );

    const selectedItinerary = parsedPlan.find((element: any) => element.index === planSelected);

    const {drawPolylineRoutes, drawRoutePlannerMarkers} = PlannerMapPresenter();

    const [zoomMap, setZoomMap] = useState(plannerSegments.length > 1 
      && plannerSegments[0] 
      && plannerSegments[plannerSegments.length - 1] 
        ? GeoUtils.getMidZoomAllPlatforms(plannerSegments[0].position, 
          plannerSegments[plannerSegments.length - 1].position) - 1
        : 13
        );

  useEffect(() => {
    if (plannerSegments.length > 1 && plannerSegments[0] && plannerSegments[plannerSegments.length - 1]) {
      setZoomMap(GeoUtils.getMidZoomAllPlatforms(plannerSegments[0].position, 
        plannerSegments[plannerSegments.length - 1].position))
    }
  }, [plannerSegments])

  console.log('Zoom', zoomMap);
  

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{ position: 'absolute', top: 0, zIndex: 10, width: '100%' }}>
          <SafeAreaView style={{backgroundColor: theme.colors.gray_200,
            paddingTop: Platform.OS === 'ios' ? 0 : 16,
            paddingBottom: 16,}}>
            <ScreenTitle title={t('planner_screen_title')}/>  
          </SafeAreaView>  
          <View style={{alignSelf: 'flex-end', marginTop: 10, marginRight: 10}}>
                <LocationButton/>
          </View>
        </View>
        <MapRender
            zoom={zoomMap}
            initialRegion={{ ...firstPosition }}
            markers={drawRoutePlannerMarkers(selectedItinerary?.legs)}
            focus={() => {}}
            // refMapView={setInstanceMapView}
            location={selectorMap.location}
            //drawListenerMarkers={[selectorMap.drawMarkers]}
            updateZoom={(zoom: number) => {
            setZoomMap(zoom);
            }}
            updateBounds={(bounds: IBounds, zoom?: number) => {}}
            polylines={drawPolylineRoutes()}
            //circles={drawCirclesItinerary()}
            //layerSelected={selectedLayer}
        />
        <RouteDetailsBottomSheetContent
          route={selectedItinerary}
        />
    </SafeAreaView>
  )
}
