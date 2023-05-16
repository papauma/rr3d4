import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { ILeg } from '../../../../../types/PlannerInterfaces';
import { useTheme } from '@src/context/themeContext';
import { random } from '@src/utils/StringUtils';
import Icon from '@src/components/commons/icon/Icon';
import RouteIconInfo from '../atoms/RouteIconInfo';
import { log } from 'react-native-reanimated';
import PlanUtils from '@src/utils/PlanUtils';

/* Línea iconográfica que muestra la leg de la ruta */
export default function RouteLegs({
  legs,
  style,
  indexSelected,
  duration,
}: {
  legs: Array<ILeg>; //tramos de un itinerario planificado
  style?: any; //estilos
  indexSelected?: number; //leg seleccionada para no tener opacidad
  duration?: number;
}) {
  const theme = useTheme();

  const renderIcons = () => {
    let results: Array<any> = [];
    if (legs?.length === 0 || !legs) {
      return [];
    }

    let minWidth = 69; 
    let totalLength = Dimensions.get('window').width - 64 ;
    let totalPublic = legs.filter((infoLeg: ILeg) => PlanUtils.isPublicMode(infoLeg.mode))
    let totalUsed = ((legs.length * 69) + ((legs.length % 2 + 1) * 12)) / totalLength 
    console.log('Total', totalUsed);
    console.log('Public', totalPublic.length);
    
    console.log('Length',totalLength);
    let newLegs = PlanUtils.organizeLengthOfLegsPublic(totalPublic, legs)
    console.log('New', newLegs);
    

    for (let i = 0; i < legs.length - 1; i++) {
      results.push(
        <RouteIconInfo
          key={`${legs[i].id} icon`}
          mode={legs[i]?.mode}
          color={legs[i]?.routeColor}
          agencyId={legs[i]?.agencyId}
          shortName={legs[i]?.routeShortName}
          duration={legs[i]?.duration}
          textColor={legs[i]?.routeTextColor}
          publicGrow={newLegs ? newLegs[i]?.styleNew : undefined}
          //incidence={legs[i]?.incidence}
          opacity={indexSelected !== undefined ? i !== indexSelected : false}
        />,
      );
      /* Separador  */
      results.push(
        <Icon
          //alt={'Icono separador'}
          key={random()}
          source={theme.drawables.general.Ic_Play}
          tint={theme.colors.gray_500}
          style={[
            styles().icon,
            styles().separator,
            indexSelected !== undefined ? (i === indexSelected ? null : styles().opacity) : null,
          ]}
        />,
      );
    }
    results.push(
      <RouteIconInfo
        key={legs[legs.length - 1].id + 'last'}
        mode={legs[legs.length - 1]?.mode}
        duration={legs[legs.length - 1]?.duration}
        color={legs[legs.length - 1]?.routeColor}
        agencyId={legs[legs.length - 1]?.agencyId}
        shortName={legs[legs.length - 1]?.routeShortName}
        textColor={legs[legs.length - 1]?.routeTextColor}
        opacity={indexSelected !== undefined ? legs.length - 1 !== indexSelected : false}
        publicGrow={newLegs ? newLegs[legs.length - 1]?.styleNew : undefined}
      />,
    );

    return results;
  };

  return (
      <View style={styles().row} accessible={true}
       //accessibilityLabel='Listado de tramos de ruta'
       >
        {renderIcons()}
      </View>
  );
}

const styles = () =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      //overflow: 'hidden',
      flexWrap: 'wrap',
      alignItems: 'center',
      flex: 1,
    },
    icon: {
      marginLeft: 4,
      alignSelf: 'center',
      flexShrink: 1,
    },
    opacity: {
      opacity: 0.2,
    },
    separator: {
      width: 8,
      height: 8,
      flexShrink: 1,
    },
  });
