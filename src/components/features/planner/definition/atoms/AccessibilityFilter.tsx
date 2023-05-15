import React from 'react'
import PlannerCard from './PlannerCard'
import { useTranslate } from '@src/context/languageContext'
import CheckBox from '@src/components/commons/checkbox/CheckBox';

interface AccessibilityFilterProps {
    selected?: boolean;
    onPress?: Function;
  }

export default function AccessibilityFilter(props: AccessibilityFilterProps) {
  const t = useTranslate();

  return (
    <PlannerCard title={t('planner_accessibility')}>
        <CheckBox
            text={t('planner_accessibility_checkbox')}
            selected={props.selected} 
            onPress={props.onPress}    
            accessibilityHint={t('accessibility_planner_preferences_filter_accessibility_desc')}
        />
    </PlannerCard>
  )
}
