import { SafeAreaView } from 'react-native';
import React from 'react';
import { defaultLocation } from '@src/utils/constants';
import MapRender from '@src/components/widgets/MapRender';

export default function MainMapScreen() {
    console.log('[MainMapScreen]');
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <MapRender
            zoom={11}
            initialRegion={defaultLocation}
        />
        </SafeAreaView>
    );
}
