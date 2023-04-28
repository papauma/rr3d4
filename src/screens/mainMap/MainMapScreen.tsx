import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { defaultLocation } from '@src/utils/constants';
import MapRender from '@src/components/widgets/MapRender';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import HomeHeader from './components/HomeHeader';
import { useDispatch, useSelector } from 'react-redux';
import { contextualInformation } from '@src/redux/slices/contextualSlice';
import BackgroundModal from '@src/components/commons/modal/BackgroundModal';
import MapView from 'react-native-maps';
import { IPosition } from '@src/types/interfaces';

export default function MainMapScreen() {
    console.log('[MainMapScreen]');
    const theme = useTheme();
    const t = useTranslate();
    const dispatch = useDispatch();
    const contextualInfo = useSelector(contextualInformation);

    const [refMapView, setRefMapView] = useState<MapView | undefined>()

    function focusOnTheMap(coords: any) {
      console.log('Coords', coords);
      
      if (refMapView) {
        //dispatch(updateLocation(coords));
        refMapView?.animateCamera({
          center: coords,
          zoom: 17,
        });
      } else {

      }
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {contextualInfo.showBackground && <BackgroundModal/>}
        <HomeHeader onPressLocation={(coords: IPosition) => focusOnTheMap(coords)}/>
        <MapRender
            zoom={11}
            initialRegion={defaultLocation}
            setRefMapView={setRefMapView}
        />
      </SafeAreaView>
    );
}

const styles = (theme: ThemeProps) => StyleSheet.create({
})
