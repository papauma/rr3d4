import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import RouteDetailsBottomSheetContent from '@src/components/features/planner/routeDetails/organisms/RouteDetailsBottomSheetContent';
import MapRender from '@src/components/widgets/MapRender';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { contextualInformation } from '@src/redux/slices/contextualSlice';
import { mapState } from '@src/redux/slices/mapSlice';
import { plannerSegmentsInformation } from '@src/redux/slices/plannerSegmentsSlice';
import { plannerInformation } from '@src/redux/slices/plannerSlice';
import { TypeRouteFilter } from '@src/types/PlannerInterfaces';
import { IBounds } from '@src/types/interfaces';
import RouteUtils from '@src/utils/RouteUtils';
import React, { useState } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function RouteDetailsScreen() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [zoomMap, setZoomMap] = useState(13);
    const t = useTranslate();
    const theme = useTheme()
    const selectorMap = useSelector(mapState);
    const plannerSegments = useSelector(plannerSegmentsInformation);
    const contextual = useSelector(contextualInformation);
    const firstPosition = { ...plannerSegments[0].position };
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



  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{ position: 'absolute', top: 0, zIndex: 10, width: '100%' }}>
          <SafeAreaView style={{backgroundColor: theme.colors.gray_200,
          paddingTop: Platform.OS === 'ios' ? 0 : 16,
          paddingBottom: 16,}}>
            <ScreenTitle title={t('planner_screen_title')}/>  
          </SafeAreaView>  
        </View>
        <MapRender
            zoom={zoomMap}
            initialRegion={{ ...firstPosition, ...{ latitudeDelta: 0.01, longitudeDelta: 0.01 } }}
            markers={/* drawRoutePlannerMarkers(selectedItinerary?.legs) */ []}
            focus={() => {}}
            // refMapView={setInstanceMapView}
            location={selectorMap.location}
            //drawListenerMarkers={[selectorMap.drawMarkers]}
            updateZoom={(zoom: number) => {
            setZoomMap(zoom);
            }}
            updateBounds={(bounds: IBounds, zoom?: number) => {}}
            //polylines={drawPolylineRoutes()}
            //circles={drawCirclesItinerary()}
            //layerSelected={selectedLayer}
        />
        <RouteDetailsBottomSheetContent
        
        />
    </SafeAreaView>
  )
}
