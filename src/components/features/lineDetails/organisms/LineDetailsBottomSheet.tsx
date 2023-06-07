import useInfoLinea from '@src/redux/hooks/lineInfo/useInfoLinea';
import React from 'react';
import {View} from 'react-native';
import LineHeader from '../atoms/LineHeader';
import LineDetailsSynoptic from '../molecules/LineDetailsSynoptic';

export default function LineDetailsBottomSheet() {
  const {
    infoLine,
    lineData,
    trip,
    direction,
    sentidoOptions,
    changeTrip,
    setLineData,
    directionId,
  } = useInfoLinea();

  console.log('Infoline', infoLine);
  console.log('LineData', lineData);

  return (
    <View style={{flex: 1, padding: 16}}>
      <LineHeader
        code={infoLine?.code}
        lineName={infoLine?.name}
        routeColor={infoLine?.routeColor}
        routeTextColor={infoLine?.routeTextColor}
      />
      <LineDetailsSynoptic stopTimes={lineData} routeColor={infoLine?.routeColor} />
    </View>
  );
}
