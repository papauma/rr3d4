import Label from '@src/components/commons/text/Label';
import { ILine } from '@src/types/ExploreInterfaces';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import DepartureLineInfo from '../atoms/DepartureLineInfo';
import { useSelector } from 'react-redux';
import { lineState } from '@src/redux/slices/linesSlices';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import TimeUtils from '@src/utils/TimeUtils';
import useTimeMessages from '@src/redux/hooks/time/useTimeMessages';

interface NextLineDeparturesProps {
    lines?: Array<ILine>;
    allLineTimes?: Array<ILineTime>;
    onPressReset?: Function;
}

export default function NextLineDepartures(props: NextLineDeparturesProps) {
  const allLinesInfo = useSelector(lineState);
  const theme = useTheme();
  const t = useTranslate()
  const {timeOfStopsFormatted} = useTimeMessages()

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View accessible={true} role={'listitem'} 
          //accessibilityLabel={'Lista de líneas que pasan por esa parada y sus tiempos de pasada'}
          style={{backgroundColor: theme.colors.white, borderRadius: 16}}
          >
            {props.allLineTimes?.slice(0, 9)?.map((line: any, index: number) => {
              console.log('Info-Linea:', line);
              let lineInfo = allLinesInfo.find((element: ILine) => element.id === line.lineId)

              let differenceTime = TimeUtils.timeTilNow(line.fecha, line.time)

              return (
                <DepartureLineInfo
                  id={line.id}
                  key={`${line.id}-${index}`}
                  transportMode={line?.transportMode}
                  lineName={line?.nameLine}
                  lineCode={lineInfo?.code}
                  routeColor={line?.routeColor}
                  routeTextColor={line?.routeTextColor}
                  headsign={line?.headSign}
                  time={timeOfStopsFormatted(line.time, line.fecha)}
                  timeNow={differenceTime}
                  style={[{marginTop: 8,}, index !== 0 ? {
                    borderTopWidth: 1, borderColor: theme.colors.gray_200,
                  } : null]}
                />
              );
            })} 
      </View>
    </View>
  )
}
