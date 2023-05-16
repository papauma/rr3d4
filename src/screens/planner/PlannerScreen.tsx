import { useNavigation } from '@react-navigation/native';
import Button from '@src/components/commons/buttons/Button';
import BackgroundModal from '@src/components/commons/modal/BackgroundModal';
import PlannerHeader from '@src/components/features/planner/definition/organisms/PlannerHeader';
import LocationButton from '@src/components/widgets/LocationButton';
import MapRender from '@src/components/widgets/MapRender';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import PlannerMapPresenter from '@src/redux/hooks/map/PlannerMapPresenter';
import useSearch from '@src/redux/hooks/search/useSearch';
import { contextualInformation } from '@src/redux/slices/contextualSlice';
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
  const navigation = useNavigation();
  const contextual = useSelector(contextualInformation);
  const theme = useTheme();
  const t = useTranslate();
  const {drawPlannerMarkers, onDragMarker, onLongPressOnThePlannerMap, drawPolyline} = PlannerMapPresenter();

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
      {contextual.showBackground && <BackgroundModal/>}
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
                <PlannerHeader/>
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
            title={t('button_confirm')}
            icon={theme.drawables.general.Ic_Plan}
            buttonSizeStyle='medium'
            style={{alignSelf: 'center'}}
            onPress={() => navigation.navigate(navigationPages.plannerResult)}
        />
      </View>
    </SafeAreaView>
  )
}
