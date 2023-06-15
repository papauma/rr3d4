import Button from '@src/components/commons/buttons/Button';
import Icon from '@src/components/commons/icon/Icon';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import Label from '@src/components/commons/text/Label';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {ILine} from '@src/types/ExploreInterfaces';
import {IMarker} from '@src/types/interfaces';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface AlertInfoProps {
  alertId: number;
  title: string;
  lines?: Array<ILine>;
  stops?: Array<IMarker>;
  startTime?: any;
  endTime?: any;
  style?:  StyleProp<ViewStyle>;
}

export default function AlertInfo(props: AlertInfoProps) {
  const theme = useTheme();
  console.log('STart', props.startTime);
  

  return (
    <View style={[styles(theme).container, props.style]}>
      {/* LÍNEAS */}
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {props.lines?.map((line: ILine, index: number) => {
            return (<LineCodeSemiCircle
                key={`${line.id}-${index}`}
                transportMode={line.transportmode}
                code={line.code}
                backgroundColor={line.routeColor ? `#${line.routeColor}` : undefined}
                textColor={line.routeTextColor ? `#${line.routeTextColor}` : undefined}
            />)
        })}
        </View>  
      <View style={[styles(theme).row, {justifyContent: 'space-between'}]}>
        <View style={{}}>
          {props.title ? (
            <Label style={styles(theme).title}>{props.title}</Label>
          ) : null}
          {props.startTime ? (
            <View style={styles(theme).row}>
              <Icon
                source={theme.drawables.general.Ic_Clock}
                tint={theme.colors.gray_600}
                size={18}
              />
              <Label style={styles(theme).date}>
                {'Desde el 1 de junio 2023 a las 09:12h.'}
              </Label>
            </View>
          ) : null}
          {props.endTime ? (
            <View style={styles(theme).row}>
              <Icon
                source={theme.drawables.general.Ic_Clock}
                tint={theme.colors.gray_600}
                size={18}
              />
              <Label style={styles(theme).date}>
                {'Hasta el 12 de junio 2023 a las 19:08h.'}
              </Label>
            </View>
          ) : null}
        </View>
        <Button
          icon={theme.drawables.general.Ic_Star}
          iconStyle={{tintColor: theme.colors.tertiary_yellow}}
          style={{flexShrink: 1, marginLeft: 4}}
          buttonCategory="tertiary"
          buttonSizeStyle='extra-small'
        />
      </View>
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    title: {
      color: theme.colors.gray_700,
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,
    },
    date: {
      color: theme.colors.gray_600,
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 18,
      marginLeft: 8,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    container: {
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: theme.colors.white,
        paddingHorizontal: 16,
    }
  });
