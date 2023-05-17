import Icon from '@src/components/commons/icon/Icon';
import IconDynamic from '@src/components/commons/icon/IconDynamic';
import Label from '@src/components/commons/text/Label';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { agencyInformation } from '@src/redux/slices/agencysSlices';
import { ILeg } from '@src/types/PlannerInterfaces';
import React, { useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import RouteLegLineInfo from './RouteLegLineInfo';
import { random } from '@src/utils/StringUtils';
import LegTimeInfo from '../atoms/LegTimeInfo';

function LineStyled({ leg, children }) {
  return (
    <View style={{ position: 'relative' }}>
      {Platform.OS === 'ios' && leg?.mode === 'WALK' ? (
        <View style={[styles().line, styles(leg).lineStyled, { borderStyle: 'solid' }]}>
          {children}
        </View>
      ) : (
        <View
          style={[
            styles().line,
            styles(leg).lineStyled,
          ]}
        >
          {children}
        </View>
      )}
    </View>
  );
}

interface LineLegProps {
  leg: ILeg;
  showTime?: boolean;
  agencyIdPrev?: any;
  index: string;
}

export default function LineLeg(props: LineLegProps) {
  const [collapsed, setCollapsed] = useState(false);
  const agencyInfo = useSelector(agencyInformation);
  const theme = useTheme();
  const t = useTranslate();

  const agencies: Array<any> = agencyInfo.dataOrigin;
  let agency = '';

  if (props.leg?.mode === 'WALK' && props.agencyIdPrev) {
    agency = agencies.find((element: any) => {
        return String(element?.gtfsAgency[0]?.id) === String(props.agencyIdPrev);
      })

  } else {
    const calculatedAgencyId =   props.leg?.agencyId !== null ?  props.leg?.agencyId.split(':')[1] : null
    agency = calculatedAgencyId
      ? agencies.find((element: any) => {
          return String(element?.gtfsAgency[0]?.id) === String(calculatedAgencyId);
        })
      : null;
  }

  const icon = agency?.transportModes[0]?.iconId;

  /* Se renderiza otra LineLeg en caso de presentar como parámetro pasado transhipment que indica un transbordo */
  return (
    <View style={{ flex: 1 }}>
      <View style={styles().row}>
        {props.leg && <LegTimeInfo leg={props.leg} first={props.index === '0'}/>}
        {props.leg && <View style={{ /* flexGrow: 3,  */ flexDirection: 'row', flex: 1, width: '100%' }}>
          <LineStyled leg={props?.leg}>
            {props.showTime && !props.leg?.last ? (
              <IconDynamic
                accessible={false}
                //alt={'Icono origen'}
                source={theme.drawables.general.Ic_Point_MyLocation}
                style={{ marginLeft: -15, marginTop: -6, zIndex: 20 }}
              />
            ) : props.leg.mode === 'WALK' ? (
              <IconDynamic
                accessible={false}
                //alt={'Icono modo de transporte ' + props.leg.mode}
                source={theme.drawables.general.Ic_gotita}
                style={{ marginLeft: -15, marginTop: 0, zIndex: 20}} //TO CHANGE color blanco de fondo
              />
            ) : (
              <IconDynamic
                accessible={false}
                //alt={'Icono modo de transporte ' + props.leg.mode}
                source={theme.drawables.general.Ic_gotita}
                style={{ marginLeft: -15, marginTop: 0, zIndex: 20 }} //TO CHANGE color blanco de fondo
              />
            )}
          </LineStyled>

          <RouteLegLineInfo
            key={random()}
            mode={props.leg.mode}
            leg={props.leg}
            color={`#${props.leg.routeColor}`}
            setCollapsed={() => setCollapsed(!collapsed)}
            collapsed={collapsed}
          />
        </View>}
      </View>

      {props.leg?.last && (
        <View style={[styles().lastItem, {flex: 1}]}>
          <View style={{flexBasis: 54, alignItems: 'center'}}>
            <Label >{props.leg.endTime}</Label>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              marginLeft: 25,
            }}
          >
            <Icon 
              style={[styles().lastIcon]} 
              source={theme.drawables.general.Ic_Point_Dest} />
            <Label style={[styles().lastText, {overflow: 'hidden',}]} numberOfLines={1} ellipsizeMode={'tail'}>{props.leg.to.name}</Label>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = (leg?: any) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
    },
    column: {
      alignItems: 'center',
      flexDirection: 'column',
    },
    circle: {
      backgroundColor: 'black',
      borderWidth: 3,
      borderStyle: 'solid',
      width: 24,
      height: 24,
      marginLeft: -15,
      marginTop: 0,
      borderRadius: 12,
      zIndex: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    line: {
      borderLeftWidth: 8,
      minHeight: 155,
    },
    smallCircle: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderStyle: 'solid',
      width: 8,
      height: 8,
      marginLeft: -8,
      marginTop: 50,
      borderRadius: 4,
    },
    containerCircle: {
      marginTop: 18,
    },
    text: {
      marginBottom: 6,
      //color: theme.colors.neutralDarkGray,
      fontSize: 12,
      fontWeight: '400',
    },
    transhipment: {
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 3,
      borderStyle: 'solid',
      width: 15,
      height: 15,
      marginLeft: -11,
      marginTop: 0,
      borderRadius: 7.5,
      zIndex: 20,
    },
    stopCode: {
      color: 'white',
      textAlign: 'center',
    },
    lastItem: {
      flexDirection: 'row',
      //marginLeft: 38,
      //paddingLeft: 24,
      //paddingRight: 24,
    },
    lastText: {
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
    },
    lastIcon: {
      marginLeft: -15,
      width: 24,
      height: 24,
    },
    lineCollapsedControl: {
      position: 'relative',
      marginLeft: 18,
      flex: 1,
      //borderColor: R.resources.colors.neutral.gray_300,
    },
    lineStyled: {
      position: 'relative',
      marginLeft: 18,
      flex: 1,
      borderStyle: leg?.mode === 'WALK' || leg?.mode === 'transhipment' ? 'dotted' : 'solid',
      borderLeftWidth: leg?.mode === 'WALK' || leg?.mode === 'transhipment' ? 6 : 8,
      borderColor:
        leg?.mode === 'WALK'
          ? 'gray'
          : `#${leg?.routeColor ?? 'fffff'}`,
    },
    lineIos: {
      position: 'relative',
      marginLeft: 18,
      flex: 1,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderStyle: 'solid',
    },
    circleStyled: {
      backgroundColor: leg?.mode === 'WALK' ? 'white' : `#${leg?.routeColor ?? 'fffff'}`,
      borderColor: leg?.mode === 'WALK' ? 'black' : `#${leg?.routeColor ?? 'fffff'}`,
      borderWidth: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
