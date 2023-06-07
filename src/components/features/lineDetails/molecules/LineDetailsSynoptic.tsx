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
}

export default function LineDetailsSynoptic(props: LineDetailsSynopticProps) {
  const theme = useTheme();
  const t = useTranslate();
  const transportmodes = useSelector(transportModeState);
  const allLines = useSelector(lineState);

  function renderLeftPart(index: number, children: any) {
    return (
      <View
        style={[
          styles(theme).leftPart,
          {
            borderEndColor:
              index === props.stopTimes?.length - 1
                ? 'transparent'
                : props.routeColor
                ? `#${props.routeColor}`
                : theme.colors.black,
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
            borderStartColor:
              index === props.stopTimes?.length - 1
                ? 'transparent'
                : props.routeColor
                ? `#${props.routeColor}`
                : theme.colors.black,
          },
        ]}>
        {children}
      </View>
    );
  }

  function renderLineStops(stopTime: any, index: number) {
    let transportmode = transportmodes.find(
      (element: ITransportMode) =>
        String(element.id) === String(stopTime.stopTransportMode),
    );

    return (
      <View style={styles(theme).container}>
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

                <View
                  style={{
                    backgroundColor: theme.colors.white,
                    position: 'absolute',
                    top:
                      index !== 0 && index !== props.stopTimes?.length - 1
                        ? 5
                        : -1,
                    left: -9,
                    borderStyle: 'solid',
                    width: 12,
                    height: 12,
                    borderRadius: 6,
                    borderWidth: 3,
                    borderColor: props.routeColor
                      ? `#${props.routeColor}`
                      : theme.colors.black,
                    zIndex: 1000,
                  }}
                />
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
      marginLeft: 8,
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
