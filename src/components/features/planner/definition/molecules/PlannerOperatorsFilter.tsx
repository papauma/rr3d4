import Label from '@src/components/commons/text/Label';
import { agencyInformation } from '@src/redux/slices/agencysSlices';
import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import PlannerCard from '../atoms/PlannerCard';
import Tag from '@src/components/commons/buttons/Tag';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';

interface PlannerOperatorsFilterProps {
  selectedOperators: Array<number>;
  setSelectedOperators?: Function;
}

//TO CHANGE la parte de donde proceden los operadores de momento se queda a la espera de los datos
export default function PlannerOperatorsFilter(props: PlannerOperatorsFilterProps) {
  /* const agencyInfo = useSelector(agencyInformation);
  const agencyOperators = agencyInfo.agencysStore; */
  const t = useTranslate()
  const theme = useTheme()

  const operatorsExamplePalma: Array<any> = [
    {
      id: 2,
      shortName: t('Bus'),
      staticIcon: theme.drawables.general.Ic_Bus,

    },
    {
      id: 8,
      shortName: t('Bicipalma'),
      staticIcon: theme.drawables.general.Ic_Bike,
    }
  ]

  let agencyOperators = operatorsExamplePalma;

  function onPressOperatorTag(id: number) {
    let copyOperatorsSelected: Array<number> = JSON.parse(JSON.stringify(props.selectedOperators));

    let foundIndex: number = copyOperatorsSelected.findIndex((operator: number) => operator === id);
    if (foundIndex !== -1) {
      copyOperatorsSelected.splice(foundIndex, 1);
    } else {
      copyOperatorsSelected.push(id);
    }
    props.setSelectedOperators?.(copyOperatorsSelected);
  }

  function renderOperatorsTags() {
    return agencyOperators.map((element: any) => (
      <Tag
        key={element.id}
        title={element?.shortName}
        selected={
          props.selectedOperators.find((operator: number) => operator === element.id) !== undefined
        }
        iconId={element?.icon}
        staticIcon={element?.staticIcon}
        onPress={() => onPressOperatorTag(element.id)}
        style={{ marginRight: 8, marginBottom: 8 }}
      />
    ));
  }

  return (
    <PlannerCard style={{ marginTop: 24 }} title={t('planner_preferences_filter_operators')}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }} 
            accessible={true} accessibilityRole='list'
            accessibilityLabel={t('accessibility_planner_preferences_operators')} 
            accessibilityHint={t('accessibility_planner_preferences_operators_desc')}
            >
              {renderOperatorsTags()}
      </View>
    </PlannerCard>
  );
}
