import Button from '@src/components/commons/buttons/Button';
import Icon from '@src/components/commons/icon/Icon';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import Label from '@src/components/commons/text/Label';
import IconBox from '@src/components/widgets/IconBox';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {transportModeState} from '@src/redux/slices/transportmodeSlices';
import {ILine} from '@src/types/ExploreInterfaces';
import {IMarker, ITransportMode} from '@src/types/interfaces';
import React from 'react';
import {Linking, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';

interface AlertInfoProps {
  alertId: number;
  title: string;
  lines?: Array<ILine>;
  stops?: Array<IMarker>;
  startTime?: any;
  endTime?: any;
  style?: StyleProp<ViewStyle>;
  isFavorite?: boolean;
  isDetailed?: boolean;
  description?: string;
  linkPdf?: string;
}

export default function AlertInfo(props: AlertInfoProps) {
  const theme = useTheme();
  const t = useTranslate();
  const transportModes = useSelector(transportModeState);

  return (
    <View style={[styles(theme).container, props.style]}>
      <View style={[styles(theme).row, {justifyContent: 'space-between'}]}>
        <View style={{flex: 1}}>
          {/* LÍNEAS */}
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {props.lines?.map((line: ILine, index: number) => {
              return (
                <LineCodeSemiCircle
                  key={`${line.id}-${index}`}
                  transportMode={line.transportmode}
                  code={line.code}
                  backgroundColor={
                    line.routeColor ? `#${line.routeColor}` : undefined
                  }
                  textColor={
                    line.routeTextColor ? `#${line.routeTextColor}` : undefined
                  }
                  styleBox={{marginBottom: 4, marginRight: 4}}
                />
              );
            })}
          </View>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {props.stops?.map((stop: IMarker, index: number) => {
              let transportMode = transportModes.find(
                (element: ITransportMode) =>
                  element.id === stop?.data?.transportMode,
              );

              return (
                <IconBox
                  key={`${stop.id}-${index}`}
                  code={stop?.data?.code}
                  alt={transportMode?.label}
                  iconId={stop?.data?.icons?.iconId}
                  styleBox={{marginBottom: 4, marginRight: 4}}
                />
              );
            })}
          </View>
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
        {props.isFavorite && (
          <Button
            icon={theme.drawables.general.Ic_Star}
            iconStyle={{tintColor: theme.colors.tertiary_yellow}}
            style={{flexShrink: 1, marginLeft: 4}}
            buttonCategory="tertiary"
            buttonSizeStyle="extra-small"
          />
        )}
      </View>
      {props.isDetailed ? (
        <>
          <View style={styles(theme).separator} />
          {props.description ? (
            <Label style={styles(theme).description}>{props.description}</Label>
          ) : null}
          {props.linkPdf && (
            <TouchableOpacity style={styles(theme).row} onPress={async () => {
              await Linking.canOpenURL(props.linkPdf).then(async (result) => {
                if (result) {
                  await Linking.openURL(props.linkPdf)
                }
              }).catch(() => {

              })
            }}>
              <Icon size={18} source={theme.drawables.general.Ic_Download} />
              <Label
                style={[
                  styles(theme).description,
                  {
                    textDecorationLine: 'underline',
                    textDecorationStyle: 'solid',
                    textDecorationColor: theme.colors.gray_600,
                    marginLeft: 8,
                  },
                ]}>
                {t('alert_download_pdf')}
              </Label>
            </TouchableOpacity>
          )}
        </>
      ) : null}
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
      flex: 1,
    },
    description: {
      color: theme.colors.gray_600,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: '400',
    },
    separator: {
      borderBottomWidth: 1,
      borderColor: theme.colors.gray_400,
      flex: 1,
      width: '100%',
      marginBottom: 8,
      marginTop: 11,
    },
  });
