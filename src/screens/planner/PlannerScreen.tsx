import { useNavigation } from '@react-navigation/native';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import RouteSegments from '@src/components/features/planner/definition/molecules/RouteSegments';
import MapRender from '@src/components/widgets/MapRender';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import PlannerMapPresenter from '@src/redux/hooks/map/PlannerMapPresenter';
import { mapState, updateZoom } from '@src/redux/slices/mapSlice';
import { IBounds } from '@src/types/interfaces';
import { defaultLocation, navigationPages } from '@src/utils/constants';
import React, { useState } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function PlannerScreen() {
  const [refMapView, setRefMapView] = useState()
  const selectorMap = useSelector(mapState);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const theme = useTheme();
  const t = useTranslate();
  const {drawPlannerMarkers} = PlannerMapPresenter();

  return (
    <SafeAreaView style={{flex: 1}}>
       <MapRender
        zoom={13}
        initialRegion={selectorMap.location ?? defaultLocation}
        markers={drawPlannerMarkers()}
        focus={() => {}}
        setRefMapView={setRefMapView}
        //showButtonFocus={selectorPermission.PermissionGeolocation}
        location={selectorMap.location}
        //drawListenerMarkers={[selectorMap.drawMarkers]}
        updateZoom={(zoom: number) => {
          dispatch(updateZoom(zoom));
        }}
        //onLongPress={onLongPressOnThePlannerMap}
        updateBounds={(bounds: IBounds, zoom?: number) => {}}
        //polylines={drawPolyline()}
        //onDragEnd={onDragMarker}
        draggableMarkers={true}
        //layerSelected={selectedLayer}
      /> 

      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: Platform.OS === 'ios' ? 0 : 16,
          paddingBottom: 16,
          top: 0,
          position: 'absolute',
          width: '100%',
          //alignItems: 'center',
          //justifyContent: 'center',
          backgroundColor: theme.colors.gray_200,
        }}
      >
        <SafeAreaView style={{display: 'flex'}}>
            <ScreenTitle
                title={t('planner_screen_title')}
                
            />
           <RouteSegments
              onSegmentPress={(index: number) => {
                navigation.navigate(navigationPages.search, {
                  previousScreenParams: { screen: 'Planner', index: index },
                  showSelectLocation: true,
                  showSelectMyLocation: true,
                });
              }}
              style={{
                segment: {
                  input: { flexBasis: 80, flexGrow: 0 },
                  paddingHorizontal: 7.5,
                  margin: 0,
                },
                flexGrow: 0,
              }}
            /> 
        </SafeAreaView>
        
      </View>
    </SafeAreaView>
  )
}
