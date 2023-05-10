import Icon from '@src/components/commons/icon/Icon'
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle'
import Label from '@src/components/commons/text/Label'
import { ThemeProps, useTheme } from '@src/context/themeContext'
import React, { useState } from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import HeadSignTimeInfo from './HeadSignTimeInfo'

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
}

export default function DepartureLineInfo(props: DepartureLineInfoProps) {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <View style={[styles(theme).content, props.style]}>
        <View style={styles(theme).container}>
            <View style={styles(theme).rowTitle}>
                <LineCodeSemiCircle
                    backgroundColor={props.routeColor ? `#${props.routeColor}` : undefined}
                    transportMode={props.transportMode}
                    textColor={props.routeTextColor ? `#${props.routeTextColor}` : undefined}
                    code={props.lineCode}
                />
                <Label style={styles(theme).title} numberOfLines={1} ellipsizeMode={'tail'}>{props.lineName}</Label>
            </View>
            <View style={[styles(theme).rowTitle, {flexShrink: 1}]}>
                {props.alert && <Icon source={theme.drawables.general.Ic_Warning}/>}
                <Icon
                    source={theme.drawables.general.Ic_Chevron_Down}
                />
            </View>
        </View>
        <View style={{flex: 1, marginTop: 12}}>
            {Object.keys(props.lineTimes).map((element, index) => {
                return (<HeadSignTimeInfo
                    headsign={element}
                    times={props.lineTimes[element].tiempos}
                    style={index !== 0 ? {marginTop: 12} : null}
                />)
            })}
        </View>
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flex: 1,
    },
    content: {
        padding: 16,
        borderRadius: 16,
        backgroundColor: theme.colors.gray_200,
    },
    rowTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
      fontSize: 14,
      fontWeight: '700',
      lineHeight: 18.2, 
      marginLeft: 8, 
      //flexGrow: 1,
      //flex: 0.5,
    },
})