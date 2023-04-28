import { SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import { defaultLocation } from '@src/utils/constants';
import MapRender from '@src/components/widgets/MapRender';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import HomeHeader from './components/HomeHeader';
import { useSelector } from 'react-redux';
import { contextualInformation } from '@src/redux/slices/contextualSlice';
import BackgroundModal from '@src/components/commons/modal/BackgroundModal';

export default function MainMapScreen() {
    console.log('[MainMapScreen]');
    const theme = useTheme();
    const t = useTranslate();
    const contextualInfo = useSelector(contextualInformation);

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {contextualInfo.showBackground && <BackgroundModal/>}
        <HomeHeader/>
        <MapRender
            zoom={11}
            initialRegion={defaultLocation}
        />
      </SafeAreaView>
    );
}

const styles = (theme: ThemeProps) => StyleSheet.create({
})
