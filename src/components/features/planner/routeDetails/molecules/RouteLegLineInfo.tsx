import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { capitalizeEveryWord, random } from '../../../../../utils/StringUtils';
import Label from '../../../../commons/text/Label';
import Icon from '@src/components/commons/icon/Icon';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import { ILeg } from '@src/types/PlannerInterfaces';
import PlanUtils from '@src/utils/PlanUtils';
import CollapseStops from '../atoms/CollapseStops';
import RouteCodeBox from '@src/components/commons/routeCode/RouteCodeBox';

interface RouteLegLineInfoProps {
  mode?: string;
  leg: ILeg;
  collapsed: boolean;
  setCollapsed: Function;
  color?: string;
}

export default function RouteLegLineInfo(props: RouteLegLineInfoProps) {
  const theme = useTheme();
  const t = useTranslate()

  const renderByMode = () => {
    let result: any = [];
    if (props.mode === 'WALK') {
      result.push(
        <View
          key={random()}
          style={styles().container}
        >
          <Label
            style={[styles().title, { overflow: 'hidden' }]}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          >
            {props.leg.from.name}
          </Label>
            <View style={[styles().rowWalk, {borderColor: theme.colors.gray_200}]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon 
                  tint={theme.colors.gray_600}
                  source={theme.drawables.general.Ic_Walk} />
                <Label style={{ marginLeft: 8, color: theme.colors.gray_700, overflow: 'hidden' }}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                >
                  {`${props.leg.distance} · ${props.leg.duration} ${t('minutes')}`}
                </Label>
              </View>
              <Icon
                tint={theme.colors.gray_600}
                source={theme.drawables.general.Ic_Map}
              />
            </View>
          <View/>
        </View>,
      );
    } else if (
      PlanUtils.isPublicMode(props.mode)
    ) {
      result.push(
        <View
          key={random()}
          style={styles().container}
        >
          <Label style={[styles().title]} numberOfLines={1} ellipsizeMode={'tail'}>
            {props.leg.from.name.toLowerCase()}
          </Label>
          <View style={{}}>
            <View style={[styles().rowSeparated, styles().stationInfo, { flexGrow: 0 }]}>
              <View style={[styles().row, { flex: 1 }]}>
                {/* To CHANGE code a falta de agencyId */}
                <Label
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[styles().textStop, { flex: 1, marginRight: 24 }]}
                >
                  {props.leg?.headsign ? props.leg?.headsign : 'Sentido'}
                </Label>
              </View>
              <Label
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  lineHeight: 20.8,
                  flexGrow: 0,
                }}
              >
                {`${props.leg.duration} ${t('minutes')}`}
              </Label>
            </View>
            {props.leg.intermediateStops && props.leg.intermediateStops?.length > 0 &&(
              <CollapseStops
                intermediateStops={props.leg.intermediateStops}
                duration={props.leg.duration}
                color={`#${props.leg.routeColor}`}
                setCollapsed={() => props.setCollapsed()}
                collapsed={props.collapsed}
              />
            )}
          </View>
          <View/>
        </View>,
      );
    } else if (props.mode === 'transhipment') {
      result.push(
        <View
          key={random()}
          style={styles().container}
        >
          <Label
            style={[styles().title, { overflow: 'hidden' }]}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          >
            {props.leg.to.name}
          </Label>
            <View style={[styles().rowWalk, {borderColor: theme.colors.gray_200}]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon 
                  tint={theme.colors.gray_600}
                  source={theme.drawables.general.Ic_Transbordo} />
                <Label style={{ marginLeft: 8, color: theme.colors.gray_700, overflow: 'hidden' }}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                >
                  {`${t('planner_transfer')} · ${props.leg.duration} ${t('minutes')}`}
                </Label>
              </View>
              <Icon
                tint={theme.colors.gray_600}
                source={theme.drawables.general.Ic_Map}
              />
            </View>
          <View/>
        </View>,
      );
    } else {
      result.push(
        <View key={random()}>
          <Label style={styles().title}>{props.leg.from.name}</Label>
          <Label style={{ marginTop: 25.5, marginLeft: 12 }}>
            {`${props.leg.distance} · ${props.leg.duration} min`}
          </Label>
        </View>,
      );
    }

    return result;
  };

  return (
    <View key={random()} style={styles().column}>
      {renderByMode()}
    </View>
  );
}

const styles = () =>
  StyleSheet.create({
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    stationInfo: {
      alignItems: 'center',
      marginTop: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 21,
      textTransform: 'capitalize',
    },
    textStop: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
      textTransform: 'capitalize',
    },
    textTranshipment: {
      marginLeft: 8,
      color: 'gray',
    },
    rowSeparated: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'stretch',
      alignItems: 'center',
      flexGrow: 0,
    },
    rowWalk: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignContent: 'stretch',
      alignItems: 'center',
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingVertical: 16,
    },
    container: {
      width: Dimensions.get('window').width - 56 - 16 * 6,
      marginLeft: 8,
      justifyContent: 'space-between',
      flex: 1
    }
  });
