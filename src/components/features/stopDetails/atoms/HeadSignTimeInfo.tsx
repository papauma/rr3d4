import Icon from '@src/components/commons/icon/Icon';
import Label from '@src/components/commons/text/Label'
import { useTheme } from '@src/context/themeContext';
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { View } from 'react-native'

interface HeadSignTimeInfoProps {
    headsign?: string;
    times?: Array<any>;
    style?: StyleProp<ViewStyle>;
}

export default function HeadSignTimeInfo(props: HeadSignTimeInfoProps) {
  const theme = useTheme()

  return (
    <View style={[styles.rowSpace, props.style]}>
        {props.headsign ? <Label style={styles.headsign}>{`<<${props.headsign}>>`}</Label> : <View/>}
        <View style={{marginLeft: 8, flexShrink: 1,}}>
            <View style={styles.row}>
                {props.times && props.times[0] ? <Label style={styles.firstTime}>{props.times[0]}</Label> : null}
                <Icon 
                    source={theme.drawables.general.Ic_Ocupacion}
                />
            </View>
            <View style={[styles.row, {marginTop: 4, marginLeft: 4}]}> 
                {props.times && props.times[1] ? <Label style={[styles.secondTime, {color: theme.colors.gray_600}]}>{props.times[1]}</Label> : null}
                <Icon 
                    source={theme.drawables.general.Ic_Ocupacion}
                    size={16}
                />
            </View>
        </View>
    </View>
  )
}

const styles =StyleSheet.create({
    rowSpace: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    headsign: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
    },
    firstTime: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 15.6,
    },
    secondTime: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18, 
    }
})
