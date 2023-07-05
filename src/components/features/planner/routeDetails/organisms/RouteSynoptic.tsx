import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import LineLeg from '../molecules/LineLeg';
import { random } from '@src/utils/StringUtils';
import { ILeg } from '@src/types/PlannerInterfaces';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import React from 'react'

interface RouteSynopticProps {
  legs: Array<ILeg>;
  style?: StyleProp<ViewStyle>;
}

export default function RouteSynoptic(props: RouteSynopticProps) {
  const theme = useTheme();
  const t = useTranslate()

  function renderLines() {
    return props.legs.map((item: ILeg, index: number) => {
      let result: Array<any> = [];
      result.push(
        <LineLeg
          key={`${index} ${item?.id} ${random()}`}
          index={String(index)}
          leg={item}
          showTime={index === 0 || index === props.legs.length - 1}
          agencyIdPrev={index !== 0 && props.legs[index - 1].agencyId}
          colorPrev={index !== 0 && props.legs[index - 1].routeColor}
          destPrev={index !== 0 ? props.legs[index - 1].to : undefined}
          legPrev={index !== 0 ? props.legs[index - 1] : undefined}
        />,
      );

      if (item.transhipment) {
        result.push(
          <LineLeg
            key={`${index} ${item?.id} ${random()}`}
            index={`${index}-t`}
            leg={{ ...item, ...{ mode: 'transhipment' } }}
            showTime={index === 0 || index === props.legs.length - 1}
          />,
        );
      }

      return result;
    });
  }

  return (<View style={[styles().content, 
              {backgroundColor: theme.colors.white, borderColor: theme.colors.gray_200},
               props.style]} 
              accessible={true} 
              //accessibilityLabel={'Listado detallado de la ruta planificada'}
              >
                {renderLines()}
          </View>);
}

const styles = () =>
  StyleSheet.create({
    content: {
      padding: 16,
      flex: 1,
      borderRadius: 16,
      borderTopWidth: 1,
      borderBottomWidth: 1,
    },
    row: {
      flexDirection: 'row',
    },
    column: {
      alignItems: 'center',
      flexDirection: 'column',
    },
    text: {
      fontSize: 14,
      fontWeight: '600',
    },
  });
