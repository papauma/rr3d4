import Icon from '@src/components/commons/icon/Icon';
import DurationText from '@src/components/commons/text/DurationText';
import Label from '@src/components/commons/text/Label';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native'

interface RouteTimeProps {
    startTime: string;
    endTime: string;
    duration: any;
    styleBigNumber?: StyleProp<TextStyle>;
    styleLetter?: StyleProp<TextStyle>;
    styleHours?: StyleProp<TextStyle>;
    warning?: boolean;
}

export default function RouteTimeInfo(props: RouteTimeProps) {
  const t = useTranslate();
  const theme = useTheme()

  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <View accessible={true} 
            accessibilityLabel={`${t('accessibility_planner_timer_itinerary_hour')}: ${`${props.startTime} - ${props.endTime}`}`}
            >
            <Label  style={[styles.number, props.styleHours]}>{`${props.startTime}-${props.endTime}`}</Label>
        </View>
        <View style={styles.row}>
            <DurationText
                styleNumber={[styles.bigNumber, props.styleBigNumber]}
                styleLetter={[styles.textTime, props.styleLetter]}
                duration={props.duration}
            />
            {props.warning && <Icon
                alt={t('accessibility_planner_card_warning')}
                source={theme.drawables.general.Ic_Warning}
                tint={theme.colors.tertiary_yellow}
                style={{marginLeft: 16}}
            />}
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    row: {
        flexDirection:'row',
        alignItems: 'center',
    },
    number: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 20.8,
    },
    bigNumber: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20.8,
        //flexGrow: 1,
    },
    textTime: {
        lineHeight: 20.8,
        fontWeight: '700',
        fontSize: 16,
        //flexGrow: 1,
    },
})
