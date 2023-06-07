import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import { useTranslate } from '@src/context/languageContext';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { lineState } from '@src/redux/slices/linesSlices';
import { ILine } from '@src/types/ExploreInterfaces';
import React from 'react'
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

export default function LinesInStop({stopTime}: {stopTime: any}) {
    const theme = useTheme()
    const allLines = useSelector(lineState);
    const t = useTranslate()

  return (
    <View style={[styles(theme).row, styles(theme).linesRow]}>
        {/* TO CHANGE */}
        {stopTime?.linesBoth?.slice(0, 6)?.map((element: any, index: number) => {
          let line = allLines.find(
            (lineFromAll: ILine) => lineFromAll.id === element.routeId,
          );
          return (
            <LineCodeSemiCircle
              key={`${element?.routeId}-${index}`}
              backgroundColor={
                line?.routeColor ? `#${line?.routeColor}` : undefined
              }
              transportMode={line?.transportmode}
              textColor={
                line?.routeTextColor
                  ? `#${line?.routeTextColor}`
                  : undefined
              }
              code={line?.code}
              styleBox={{marginLeft: 8, marginTop: 4}}
            />
          );
        })}
    </View>
  )
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    linesRow: {
      flexWrap: 'wrap',
      marginBottom: 28,
    },
  });