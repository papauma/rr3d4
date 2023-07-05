import Icon from '@src/components/commons/icon/Icon';
import IconDynamic from '@src/components/commons/icon/IconDynamic';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {agencyInformation} from '@src/redux/slices/agencysSlices';
import {ILeg, ILocationPlan} from '@src/types/PlannerInterfaces';
import React, {useState} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {useSelector} from 'react-redux';
import RouteLegLineInfo from './RouteLegLineInfo';
import {random} from '@src/utils/StringUtils';
import LegTimeInfo from '../atoms/LegTimeInfo';
import {stopsState} from '@src/redux/slices/stopsSlices';
import {transportModeState} from '@src/redux/slices/transportmodeSlices';
import {IMarker, ITransportMode} from '@src/types/interfaces';

function LineStyled({leg, children}) {
  return (
    <View style={{position: 'relative'}}>
      {Platform.OS === 'ios' && leg?.mode === 'WALK' ? (
        <View
          style={[
            styles().line,
            styles(leg).lineStyled,
            {borderStyle: 'solid'},
          ]}>
          {children}
        </View>
      ) : (
        <View style={[styles().line, styles(leg).lineStyled]}>{children}</View>
      )}
    </View>
  );
}

interface LineLegProps {
  leg: ILeg;
  showTime?: boolean;
  agencyIdPrev?: any;
  colorPrev?: string;
  index: string;
  destPrev?: ILocationPlan;
  legPrev?: ILeg;
}

export default function LineLeg(props: LineLegProps) {
  const [collapsed, setCollapsed] = useState(false);
  const agencyInfo = useSelector(agencyInformation);
  const theme = useTheme();
  const t = useTranslate();
  const allStops = useSelector(stopsState);
  const transportModes = useSelector(transportModeState);

  const agencies: Array<any> = agencyInfo.dataOrigin;
  let agency = '';

  if (props.leg?.mode === 'WALK' && props.agencyIdPrev) {
    const calculatedAgencyId =
      props.agencyIdPrev !== null ? props.agencyIdPrev.split(':')[1] : null;

    agency = agencies.find((element: any) => {
      return String(element?.gtfsAgency[0]?.id) === String(calculatedAgencyId);
    });
  } else {
    const calculatedAgencyId =
      props.leg?.agencyId !== null ? props.leg?.agencyId.split(':')[1] : null;
    agency = calculatedAgencyId
      ? agencies.find((element: any) => {
          return (
            String(element?.gtfsAgency[0]?.id) === String(calculatedAgencyId)
          );
        })
      : null;
  }

  let icon;
  let transportMode: ITransportMode | undefined;

  if (agency) {
    let stopCode: string | undefined | null;
    if (props.leg?.mode === 'WALK' && props.agencyIdPrev) {
      stopCode = props.legPrev?.to?.stopCode;
    } else {
      stopCode = props.leg.from.stopCode;
    }

    let stopFound = allStops.find(
      (element: IMarker) =>
        String(element.stopCode) === String(stopCode) &&
        String(element.data?.agencyOriginId) === String(agency?.id),
    );

    transportMode = transportModes.find(
      (element: ITransportMode) =>
        String(element.id) === String(stopFound?.data?.transportMode),
    );

    icon = transportMode?.iconId;
  }

  /* Se renderiza otra LineLeg en caso de presentar como parámetro pasado transhipment que indica un transbordo */
  return (
    <View style={{flex: 1}}>
      <View style={styles().row}>
        {props.leg && (
          <LegTimeInfo leg={props.leg} first={props.index === '0'} legPrev={props.legPrev} />
        )}
        {props.leg && (
          <View
            style={{
              /* flexGrow: 3,  */ flexDirection: 'row',
              flex: 1,
              width: '100%',
            }}>
            <LineStyled leg={props?.leg}>
              {props.showTime && !props.leg?.last ? (
                <IconDynamic
                  accessible={false}
                  //alt={'Icono origen'}
                  source={theme.drawables.general.Ic_Point_MyLocation}
                  style={{marginLeft: -15, marginTop: -6, zIndex: 20}}
                />
              ) : props.leg.mode === 'WALK' ? (
                <View
                  style={[
                    styles().circle,
                    {
                      backgroundColor: theme.colors.white,
                      borderColor: props.colorPrev
                        ? `#${props.colorPrev}`
                        : theme.colors.black,
                      marginTop: -2,
                    },
                  ]}
                />
              ) : (
                <View
                  style={[
                    styles().circle,
                    {
                      backgroundColor: theme.colors.white,
                      borderColor: props.leg.routeColor
                        ? `#${props.leg.routeColor}`
                        : theme.colors.black,
                    },
                  ]}
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
              agency={agency}
              icon={icon}
              destPrev={props.destPrev}
              transportMode={transportMode}
            />
          </View>
        )}
      </View>

      {props.leg?.last && (
        <View style={[styles().lastItem, {flex: 1}]}>
          <View style={{flexBasis: 54, alignItems: 'center'}}>
            <Label>{props.leg.endTime}</Label>
          </View>
          <View
            style={{
              flexDirection: 'row',
              height: '100%',
              marginLeft: 25,
            }}>
            <Icon
              style={[styles().lastIcon]}
              source={theme.drawables.general.Ic_Flag}
            />
            <Label
              style={[styles().lastText, {overflow: 'hidden'}]}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {props.leg.to.name}
            </Label>
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
      borderWidth: 5,
      borderStyle: 'solid',
      width: 16,
      height: 16,
      marginLeft: -12,
      marginTop: 0,
      borderRadius: 8,
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
    },
    lastText: {
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 8,
      textTransform: 'capitalize',
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
    },
    lineStyled: {
      position: 'relative',
      marginLeft: 18,
      flex: 1,
      borderStyle:
        leg?.mode === 'WALK' || leg?.mode === 'transhipment'
          ? 'dotted'
          : 'solid',
      borderLeftWidth: 8,
      borderColor:
        leg?.mode === 'WALK' || leg?.mode === 'transhipment' ? 'gray' : `#${leg?.routeColor ?? 'fffff'}`,
    },
    lineIos: {
      position: 'relative',
      marginLeft: 18,
      flex: 1,
      borderWidth: 0,
      borderLeftWidth: 0,
      borderStyle: 'solid',
    },
  });
