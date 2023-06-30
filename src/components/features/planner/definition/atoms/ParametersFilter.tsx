import React from 'react'
import PlannerCard from './PlannerCard'
import { useTranslate } from '@src/context/languageContext'
import CheckBox from '@src/components/commons/checkbox/CheckBox';

interface ParametersFilterProps {
    selectedAccessibility?: boolean;
    onPressAccessibility?: Function;
    selectedDisuasorio?: boolean;
    onPressDisuasorio?: Function;
    selectedInterchange?: boolean;
    onPressInterchange?: Function;
  }

export default function ParametersFilter(props: ParametersFilterProps) {
  const t = useTranslate();

  return (
    <PlannerCard title={t('planner_preferences_filter_route_parameters')}>
        <CheckBox
            key={'accesi'}
            text={t('planner_accessibility_checkbox')}
            selected={props.selectedAccessibility} 
            onPress={props.onPressAccessibility}    
            accessibilityHint={t('accessibility_planner_preferences_filter_accessibility_desc')}
        />
        <CheckBox
            key={'disuasorio'}
            style={{marginTop: 8}}
            text={t('planner_parking_disuasorio_checkbox')}
            selected={props.selectedDisuasorio} 
            onPress={props.onPressDisuasorio}    
            accessibilityHint={t('accessibility_planner_preferences_filter_disuasorio_desc')}
        />
        {/* <CheckBox
            style={{marginTop: 8}}
            key={'interchange'}
            text={t('planner_parking_interchange_checkbox')}
            selected={props.selectedInterchange} 
            onPress={props.onPressInterchange}    
            accessibilityHint={t('accessibility_planner_preferences_filter_interchange_desc')}
        /> */}
    </PlannerCard>
  )
}
