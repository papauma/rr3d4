import Icon from '@src/components/commons/icon/Icon';
import IconDynamic from '@src/components/commons/icon/IconDynamic';
import RouteCodeBox from '@src/components/commons/routeCode/RouteCodeBox';
import Label from '@src/components/commons/text/Label';
import { useLanguage, useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { agencyInformation } from '@src/redux/slices/agencysSlices';
import PlanUtils from '@src/utils/PlanUtils';
import { random } from '@src/utils/StringUtils';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

interface RouteIconInfoProps {
  agencyId?: number;
  mode?: string;
  opacity?: boolean;
  duration?: number;
  shortName?: string;
  textColor?: string;
  color?: string;
  publicGrow?: any;
}

export default function RouteIconInfo(props: RouteIconInfoProps) {
  const agencyInfo = useSelector(agencyInformation);

  const agencies: Array<any> = agencyInfo.dataOrigin;
  const theme = useTheme();
  const t = useTranslate();
  const locale = useLanguage()

  const calculatedAgencyId = props.agencyId ? props.agencyId.split(':')[1] : null;
  const agency = calculatedAgencyId
    ? agencies.find((agency: any) => {
        return String(agency?.gtfsAgency[0]?.id) === String(calculatedAgencyId);
      })
    : null;

  const icon = agency?.transportModes[0]?.iconId;

  const renderByMode = () => {
    let result: Array<any> = [];
    if (props.mode === 'WALK') {
      result.push(
        <View
          key={random()}
          style={[styles().boxWalking, 
            {backgroundColor: theme.colors.gray_200},
            props.opacity ? styles().opacity : null]}
          accessible={true}
          accessibilityLabel={`${t('accessibility_planner_card_leg_walk')} ${props.duration} min`}
        >
          <Icon 
            //alt={'Icono andando'} 
            size={18}
            source={theme.drawables.general.Ic_Walk} />
          <View style={styles().numberView}>
            <Label style={styles().numberSmall}>{`${props.duration} min`}</Label>
          </View>
        </View>,
      );
    } else if (props.mode === 'TRANSFER') {
      result.push(
        <View
          key={random()}
          style={[styles().boxWalking, 
            {backgroundColor: theme.colors.gray_200},
            props.opacity ? styles().opacity : null]}
          accessible={true}
          accessibilityLabel={`${t('accessibility_planner_card_leg_transfer')} ${props.duration} min`}
        >
          <Icon 
            //alt={'Icono andando'} 
            size={18}
            source={theme.drawables.general.Ic_Transbordo} />
          <View style={styles().numberView}>
            <Label style={styles().numberSmall}>{`${props.duration} min`}</Label>
          </View>
        </View>,
      );
    } else if (
      PlanUtils.isPublicMode(props.mode)
    ) {
      result.push(
        <View
          key={random()}
          style={[styles().rowDirection, 
            {backgroundColor: props.color ? `#${props.color}` : theme.colors.gray_500},
            props.publicGrow ? props.publicGrow : null,
            props.opacity ? styles().opacity : null]}
          accessible={true}
          accessibilityLabel={locale === 'es' ? `${props.mode?.toLowerCase()} ${t('accessibility_planner_card_leg_trip')}, ${props.duration} min`
            : `${t('accessibility_planner_card_leg_trip')}, ${t('accessibility_duration')} ${props.duration} min`
          }
        >
          {props.duration !== undefined ? <Label style={[{fontSize: 14, lineHeight: 21, fontWeight: '400', color: theme.colors.white},
            props.textColor ? {color: `#${props.textColor}`} : undefined
          ]}>
            {props.duration}
          </Label> : null}
          <IconDynamic accessible={false} 
            //alt={`Icono modo de transporte ${props.mode}`} 
            style={{marginLeft: 2}}
            color={props.textColor ? {color: `#${props.textColor}`} : theme.colors.white}
            iconId={icon} 
            size={18} />
        </View>,
      );
    } else {
      //TO DO (posible caso de bicis)
      result.push(
        <View
          key={random()}
          style={[styles().boxWalking, props.opacity ? styles().opacity : null]}
          accessible={true}
          //accessibilityLabel={`Tramo ruta transporte, duración ${props.duration} min`}
        >
          <IconDynamic 
            //alt={'Icono'} 
            iconId={icon} size={32} />
        </View>,
      );
    }
    return result;
  };

  return (
    <>
      {renderByMode()}
    </>
  );
}

const styles = () =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      marginLeft: 10,
      marginBottom: 8,
    },
    numberSmall: {
      fontSize: 12,
      fontWeight: '400',
      marginLeft: 6,
    },
    text: {
      fontSize: 12,
      fontWeight: '600',
      textAlign: 'center',
      justifyContent: 'center',
      zIndex: 20,
    },
    numberView: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    rowDirection: {
      flexDirection: 'row',
      borderRadius: 8,
      padding: 8,
      alignItems: 'center',
      //flexGrow: 1,
      justifyContent: 'center',
      minWidth: 69,
      flexShrink: 1,
      marginTop: 8,
    },
    opacity: {
      opacity: 0.2,
    },
    boxWalking: {
      alignItems: 'center',
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 8,
      flexShrink: 1,
      flexGrow: 0,
      marginTop: 8,
    }
  });
