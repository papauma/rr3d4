import Icon from '@src/components/commons/icon/Icon';
import Label from '@src/components/commons/text/Label';
import { useTranslate } from '@src/context/languageContext';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import { TypeRouteFilter } from '@src/types/PlannerInterfaces';
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import RouteTimeInfo from '../atoms/RouteTimeInfo';
import RouteLegs from './RouteLegs';

interface RouteCardProps {
    style?: StyleProp<ViewStyle>;
    first?: boolean;
    routeType?: TypeRouteFilter;
    route?: any;
}

export default function RouteCard(props: RouteCardProps) {
  const theme = useTheme();
  const t = useTranslate();

  return (
    <View style={[styles(theme).card, props.first ? styles(theme).cardSelected : null, props.style]}>
        {props.first && (<View style={styles(theme).positionFirst}>
            <View style={styles(theme).boxFirst}>
                <Icon
                    source={theme.drawables.general.Ic_Bus}
                    size={18}
                />
                <Label style={styles(theme).titleRoute}>{'Ruta más rápida'}</Label>
            </View>
        </View>)}
        <RouteTimeInfo
            duration={props.route?.duration}
            startTime={props.route?.startTime }
            endTime={props.route?.endTime}
            styleBigNumber={{ fontSize: 20, lineHeight: 26 }}
            styleLetter={{ fontSize: 14, lineHeight: 18.2 }}
            warning={props.route?.alert}
        />
        <RouteLegs legs={props.route?.legs} duration={props.route?.duration} />
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    card: {
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 24,
        backgroundColor: theme.colors.white,
        borderRadius: 16,
    },
    cardSelected: {
        borderWidth: 2,
        borderColor: theme.colors.primary_300,
    },
    boxFirst: {
        backgroundColor: theme.colors.primary_100,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    positionFirst: {
        position: 'absolute',
        marginTop: -16,
        marginLeft: 12,
    },
    titleRoute: {
       fontSize: 12,
       fontWeight: '400',
       lineHeight: 18,
       color: theme.colors.gray_700, 
       marginLeft: 2,
    },
})
