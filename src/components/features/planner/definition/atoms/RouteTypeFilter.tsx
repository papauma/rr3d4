import React from 'react';
import { View } from 'react-native';
import { TypeRouteFilter } from '../../../../../types/PlannerInterfaces';
import PlannerCard from './PlannerCard';
import RadioButtonOption from '@src/components/commons/menu/RadioButtonOption';
import { useTranslate } from '@src/context/languageContext';

interface RouteTypeFilterProps {
  selected?: TypeRouteFilter;
  setSelected?: Function;
}

export default function RouteTypeFilter(props: RouteTypeFilterProps) {
  const t = useTranslate()

  return (
    <PlannerCard style={{ marginBottom: 24 }} title={t('planner_preferences_filter_route_type')}>
        <RadioButtonOption
          text={t('planner_preferences_filter_route_type_fast')}
          selected={TypeRouteFilter.FAST === props.selected}
          onPress={() => props.setSelected?.(TypeRouteFilter.FAST)}
          viewStyle={{ marginBottom: 8 }}
        />
        <RadioButtonOption
          text={t('planner_preferences_filter_route_type_transfer')}
          selected={TypeRouteFilter.TRANSFER === props.selected}
          onPress={() => props.setSelected?.(TypeRouteFilter.TRANSFER)}
          viewStyle={{ marginBottom: 8 }}
        />
        <RadioButtonOption
          text={t('planner_preferences_filter_route_type_walk')}
          onPress={() => props.setSelected?.(TypeRouteFilter.WALK)}
          selected={TypeRouteFilter.WALK === props.selected}
        />
    </PlannerCard>
  );
}
