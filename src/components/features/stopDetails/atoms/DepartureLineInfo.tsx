import Icon from '@src/components/commons/icon/Icon'
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle'
import Label from '@src/components/commons/text/Label'
import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'

interface DepartureLineInfoProps {
    id: number;
    transportMode: number;
    lineName: string;
    lineCode?: string;
    routeColor?: string;
    routeTextColor?: string;
    lineTimes?: any;
    alert?: any;
    style?: StyleProp<ViewStyle>;
    headsign?: string;
    time?: string;
    timeNow?: string;
}

export default function DepartureLineInfo(props: DepartureLineInfoProps) {
  const theme = useTheme();
  
  return (
    <TouchableOpacity style={[styles(theme).content, props.style]}>
        <View style={styles(theme).container}>
            <View style={styles(theme).rowTitle}>
                <LineCodeSemiCircle
                    backgroundColor={props.routeColor ? `#${props.routeColor}` : undefined}
                    transportMode={props.transportMode}
                    textColor={props.routeTextColor ? `#${props.routeTextColor}` : undefined}
                    code={props.lineCode}
                />
                {/* <Label style={styles(theme).title} numberOfLines={1} ellipsizeMode={'tail'}>{props.lineName}</Label> */}
                <Icon 
                    source={theme.drawables.general.Ic_Ocupacion}
                    style={{marginLeft: 8}}
                />
            </View>
            <View style={[styles(theme).rowTitle, {flexShrink: 1}]}>
                {props.timeNow && <Icon 
                    source={theme.drawables.general.Ic_Real_Time}
                    tint={theme.colors.tertiary_yellow}
                    size={12}
                    style={{transform:[{rotateY: '180deg'}],
                    marginBottom: 7,}}
                />}
                {props.timeNow ? <Label style={styles(theme).timeDifference}>{props.timeNow}</Label> : null}
                {props.alert && 
                    (<Icon 
                        source={theme.drawables.general.Ic_Error}
                        tint={theme.colors.tertiary_yellow}
                        style={{marginRight: -28, marginTop: -36}}
                        />)}
            </View>
        </View>
        <View style={[styles(theme).container, {marginTop: 8}]}>
            {props.headsign ? <Label style={styles(theme).title}>{props.headsign}</Label> : null}
            {props.time ? <Label style={styles(theme).time}>{props.time}</Label> : null}
        </View>
    </TouchableOpacity>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    rowTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 24,  
      color: theme.colors.gray_700,
      marginLeft: 16,
      //flexGrow: 1,
      //flex: 0.5,
    },
    time: {
        color: theme.colors.gray_600,
        fontWeight: '400',
        lineHeight: 21,
        fontSize: 14,
    },
    timeDifference: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 23.4,
        color: theme.colors.gray_700,
    }
})