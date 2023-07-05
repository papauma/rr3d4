import Icon from '@src/components/commons/icon/Icon';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import DurationText from '@src/components/commons/text/DurationText';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {ILeg} from '@src/types/PlannerInterfaces';
import PlanUtils from '@src/utils/PlanUtils';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface LegTimeInfoProps {
  first?: boolean;
  leg: ILeg;
  legPrev?: ILeg;
}

export default function LegTimeInfo(props: LegTimeInfoProps) {
  const theme = useTheme();
  const t = useTranslate();

  function renderSemiCircleCodeInfo() {
    if (PlanUtils.isPublicMode(props.leg.mode)) {
      return (
        <LineCodeSemiCircle
          styleBox={{flexBasis: 54}}
          code={props.leg?.routeShortName}
          backgroundColor={
            props.leg.routeColor ? `#${props.leg.routeColor}` : 'black'
          }
          textColor={
            props.leg.routeTextColor
              ? `#${props.leg.routeTextColor}`
              : theme.colors.white
          }
          transportMode={
            props.leg.mode === 'RAIL'
              ? 7
              : props.leg.mode === 'TRAM'
              ? 10
              : undefined
          }
        />
      );
    } else if (PlanUtils.isPublicMode(props.legPrev?.mode)) {
      return (
        <LineCodeSemiCircle
          styleBox={{flexBasis: 54}}
          code={props.legPrev?.routeShortName}
          backgroundColor={
            props.legPrev?.routeColor ? `#${props.legPrev.routeColor}` : 'black'
          }
          textColor={
            props.legPrev?.routeTextColor
              ? `#${props.legPrev.routeTextColor}`
              : theme.colors.white
          }
          transportMode={
            props.legPrev?.mode === 'RAIL'
              ? 7
              : props.legPrev?.mode === 'TRAM'
              ? 10
              : undefined
          }
        />
      );
    } else {
      return null;
    }
  }

  function renderFirstLeg() {
    let timeDifference = Math.round(
      (props.leg.departureTime.getTime() - new Date().getTime()) / 60000,
    );

    let hoursDuration =
      timeDifference / 60 >= 1 ? parseInt((timeDifference / 60) as any) : null;
    let minutesDuration = hoursDuration ? timeDifference % 60 : timeDifference;

    return (
      <View style={styles.container} accessible={true}>
        <Label style={[styles.departureTime, {color: theme.colors.gray_700}]}>
          {timeDifference > 0
            ? `${t('planner_route_departure')}:`
            : t('planner_timer_now')}
        </Label>
        {timeDifference > 0 ? (
          <View style={styles.row}>
            {/* <Icon
          source={theme.drawables.general.Ic_Real_Time}
          size={10}
          tint={theme.colors.tertiary_yellow}
          style={styles.icon}
        /> */}
            {timeDifference ? (
              <Label style={styles.duration}>
                {hoursDuration
                  ? `${hoursDuration} h ${minutesDuration} min`
                  : `${minutesDuration} min`}
              </Label>
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {props.first ? (
        renderFirstLeg()
      ) : (
        <View style={styles.container} accessible={true}>
          {renderSemiCircleCodeInfo()}
          {props.leg.startTime ? (
            <Label
              style={[styles.departureTime, {color: theme.colors.gray_700}]}>
              {props.leg.startTime}
            </Label>
          ) : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexBasis: 54,
    alignItems: 'center',
  },
  departureTime: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    transform: [{rotateY: '180deg'}],
    marginBottom: 7,
  },
  duration: {
    fontWeight: '700',
    lineHeight: 18.2,
    fontSize: 14,
  },
});
