import Icon from '@src/components/commons/icon/Icon';
import Label from '@src/components/commons/text/Label';
import { useTranslate } from '@src/context/languageContext';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import { TypeRouteFilter } from '@src/types/PlannerInterfaces';
import React, { useMemo } from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import RouteTimeInfo from '../atoms/RouteTimeInfo';
import RouteLegs from './RouteLegs';

interface RouteCardProps {
    style?: StyleProp<ViewStyle>;
    first?: boolean;
    routeType?: TypeRouteFilter;
    route?: any;
    onPressCard?: Function;
    index: any;
}

export default function RouteCard(props: RouteCardProps) {
  const theme = useTheme();
  const t = useTranslate();

  //TO CHANGE (cambiar de sitio)
  const infoOrderCard = useMemo(() => {
    let infoOrder = {
        title: t('planner_result_card_order_fast'),
        icon: theme.drawables.general.Ic_Bus,
    }

    if (props.routeType === TypeRouteFilter.TRANSFER) {
        infoOrder = {
            title: t('planner_result_card_order_transfer'),
            icon: theme.drawables.general.Ic_Transbordo,
        }
    } else if (props.routeType === TypeRouteFilter.WALK) {
        infoOrder = {
            title: t('planner_result_card_order_walk'),
            icon: theme.drawables.general.Ic_Walk,
        }
    }

    return infoOrder
  }, [props.routeType])

  return (
    <TouchableOpacity 
        style={[styles(theme).card, props.first ? styles(theme).cardSelected : null, props.style]}
        onPress={() => props.onPressCard?.(props.index)}
        >
        {props.first && (<View style={styles(theme).positionFirst}>
            <View style={styles(theme).boxFirst} accessible={true}>
                <Icon
                    source={infoOrderCard.icon}
                    size={18}
                />
                <Label style={styles(theme).titleRoute}>{infoOrderCard.title}</Label>
            </View>
        </View>)}
        <RouteTimeInfo
            duration={props.route?.duration}
            startTime={props.route?.startTime }
            endTime={props.route?.endTime}
            warning={props.route?.alert}
        />
        <RouteLegs legs={props.route?.legs} duration={props.route?.duration} />
    </TouchableOpacity>
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
        marginTop: 16,
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
        zIndex: 40,
    },
    titleRoute: {
       fontSize: 12,
       fontWeight: '400',
       lineHeight: 18,
       color: theme.colors.gray_700, 
       marginLeft: 2,
    },
})
