import useInfoLinea from '@src/redux/hooks/lineInfo/useInfoLinea';
import React from 'react';
import {View} from 'react-native';
import LineHeader from '../atoms/LineHeader';
import LineDetailsSynoptic from '../molecules/LineDetailsSynoptic';
import SelectorDetailsOfLine from '../molecules/SelectorDetailsOfLine';
import HeadSignSelector from '../atoms/HeadSignSelector';

export default function LineDetailsBottomSheet() {
  /* TO CHANGE */
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
  console.log('Trip', trip);
  

  return (
    <View style={{flex: 1, padding: 16}}>
      <LineHeader
        code={infoLine?.code}
        lineName={infoLine?.name}
        routeColor={infoLine?.routeColor}
        routeTextColor={infoLine?.routeTextColor}
      />
      <HeadSignSelector
        lineId={lineData?.id}
        directionId={directionId}
        sentidoOptions={sentidoOptions}
        headsign={direction}
      />
      <SelectorDetailsOfLine
        lineData={lineData}
        routeColor={infoLine?.routeColor}
      />
    </View>
  );
}
