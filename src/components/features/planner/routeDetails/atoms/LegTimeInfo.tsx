import Icon from '@src/components/commons/icon/Icon';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import Label from '@src/components/commons/text/Label';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { ILeg } from '@src/types/PlannerInterfaces';
import PlanUtils from '@src/utils/PlanUtils';
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface LegTimeInfoProps {
    first?: boolean;
    leg: ILeg;
}

export default function LegTimeInfo(props: LegTimeInfoProps) {
  const theme = useTheme();
  const t = useTranslate();

  return (
    <View style={styles.container}>
       {props.first 
            ? (<View style={styles.container} accessible={true}>
                <Label style={[styles.departureTime, {color: theme.colors.gray_700}]}>{`${t('planner_route_departure')}:`}</Label>
                <View style={styles.row}>
                    <Icon
                        source={theme.drawables.general.Ic_Real_Time}
                        size={10}
                        tint={theme.colors.tertiary_yellow}
                        style={styles.icon}
                    />
                    {props.leg.duration ? <Label style={[styles.duration, {color: theme.colors.gray_700}]}>{`${props.leg.duration} min`}</Label> : null}
                </View>
            </View>)
            : (<View style={styles.container} accessible={true}>
                {PlanUtils.isPublicMode(props.leg.mode) && (
                    <LineCodeSemiCircle
                        styleBox={{flexBasis: 54,}}
                        code={props.leg?.routeShortName }
                        backgroundColor={props.leg.routeColor ? `#${props.leg.routeColor}` : 'black'}
                        textColor={
                        props.leg.routeTextColor
                            ? `#${props.leg.routeTextColor}`
                            : theme.colors.white
                        }
                        transportMode={props.leg.mode === 'RAIL' ? 7 : props.leg.mode === 'TRAM' ? 10 : undefined}
                    />
                    )}
                {props.leg.startTime ? <Label style={[styles.departureTime, {color: theme.colors.gray_700}]}>{props.leg.startTime}</Label> : null}
            </View>)
        } 
    </View>
  )
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
        transform:[{rotateY: '180deg'}],
        marginBottom: 7,
    },
    duration: {
        fontWeight: '700',
        lineHeight: 18.2,
        fontSize: 14,
    }
})
