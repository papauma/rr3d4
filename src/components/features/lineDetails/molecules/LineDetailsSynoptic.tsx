import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Icon from '@src/components/commons/icon/Icon';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import Label from '@src/components/commons/text/Label';
import IconBox from '@src/components/widgets/IconBox';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {lineState} from '@src/redux/slices/linesSlices';
import {transportModeState} from '@src/redux/slices/transportmodeSlices';
import {ILine} from '@src/types/ExploreInterfaces';
import {ITransportMode} from '@src/types/interfaces';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import LinesInStop from '../atoms/LinesInStop';

interface LineDetailsSynopticProps {
  stopTimes?: Array<any>;
  routeColor?: string;
  stopSelected?: number;
}

export default function LineDetailsSynoptic(props: LineDetailsSynopticProps) {
  const theme = useTheme();
  const t = useTranslate();
  const transportmodes = useSelector(transportModeState);
  const allLines = useSelector(lineState);

  let indexStopSelected = props.stopTimes?.findIndex((element: any) => element.id === props.stopSelected)

  function renderLineColor(index: number) {
    if (indexStopSelected === undefined) {
      return 'black'
    }

    let isInsideStopSelected = index < indexStopSelected;

    if (index === props.stopTimes?.length - 1) {
      return 'transparent'
    } else if (isInsideStopSelected) {
      return theme.colors.gray_500;
    } else if (props.routeColor) {
      return `#${props.routeColor}`
    } else {
      return theme.colors.black
    }
  }

  function renderLeftPart(index: number, children: any) {
    return (
      <View
        style={[
          styles(theme).leftPart,
          {
            borderEndColor: renderLineColor(index)
          },
        ]}>
        {children}
      </View>
    );
  }

  function renderRightPart(index: number, children: any) {
    
    return (
      <View
        style={[
          styles(theme).rightPart,
          {
            borderStartColor: renderLineColor(index)
          },
        ]}>
        {children}
      </View>
    );
  }

  function renderCircle(index: number) {
    if (indexStopSelected === undefined) {
      return null
    }

    let isInsideStopSelected = index < indexStopSelected;

    return (<View
      style={{
        backgroundColor: theme.colors.white,
        position: 'absolute',
        top:
          index !== 0 && index !== props.stopTimes?.length - 1
            ? 5
            : -1,
        left: indexStopSelected === index ? -14 : -11,
        borderStyle: 'solid',
        width: indexStopSelected === index ? 22 : 16,
        height: indexStopSelected === index ? 22 : 16,
        borderRadius: indexStopSelected === index ? 11 : 8,
        borderWidth: 3,
        borderColor: isInsideStopSelected 
          ? theme.colors.gray_500 
          : props.routeColor
          ? `#${props.routeColor}`
          : theme.colors.black,
        zIndex: 1000,
      }}
    />)
  }

  function renderLineStops(stopTime: any, index: number) {
    let transportmode = transportmodes.find(
      (element: ITransportMode) =>
        String(element.id) === String(stopTime.stopTransportMode),
    );

    return (
      <View style={styles(theme).container} key={`${index}-${stopTime?.stopCode}`}>
        <View
          style={[
            {
              minHeight: 54,
              paddingTop: index === 0 ? 18 : 0,
              flex: 1,
            },
          ]}>
          <View
            style={[
              {
                flexDirection: 'row',
                flex: 1,
              },
            ]}>
            {/* LEFT UP */}
            {renderLeftPart(
              index,
              <>
                <IconBox
                  code={stopTime?.stopCode}
                  alt={transportmode?.label}
                  iconId={transportmode?.iconId}
                />

                {/* DOWN */}
                <View style={[styles(theme).row, {marginTop: 5}]}>
                  <Icon
                    size={18}
                    source={theme.drawables.general.Ic_Clock}
                    tint={theme.colors.gray_700}
                  />
                  <Label style={styles(theme).time}>{'09:31'}</Label>
                </View>
              </>,
            )}

            {/* RIGHT UP */}

            {renderRightPart(
              index,
              <>
                <View style={{flex: 1}}>
                  {stopTime?.stopName ? (
                    <Label style={styles(theme).name}>
                      {stopTime?.stopName}
                    </Label>
                  ) : null}
                </View>

                {/* CIRCLES */}

                {renderCircle(index)}
              </>,
            )}
          </View>

          <View
            style={[
              {
                flexDirection: 'row',
                flex: 1,
              },
            ]}>
            {/* LEFT DOWN */}
            {renderLeftPart(index, undefined)}
            {/* RIGHT DOWN */}
            {renderRightPart(index, <LinesInStop stopTime={stopTime} />)}
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <BottomSheetScrollView>
        {props.stopTimes?.map((stopTime: any, index: number) => {
          return renderLineStops(stopTime, index);
        })}
      </BottomSheetScrollView>
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    time: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      color: theme.colors.gray_700,
    },
    name: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
      marginLeft: 10,
    },
    container: {
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    leftPart: {
      alignItems: 'flex-end',
      paddingEnd: 20.5,
      paddingStart: 4,
      borderEndWidth: 3,
      flexBasis: 80,
    },
    rightPart: {
      flex: 1,
      flexDirection: 'row',
      borderStartWidth: 3,
    },
  });
