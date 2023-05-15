import { useNavigation } from '@react-navigation/native';
import Button from '@src/components/commons/buttons/Button';
import ScreenTitle from '@src/components/commons/text/ScreenTitle'
import AccessibilityFilter from '@src/components/features/planner/definition/atoms/AccessibilityFilter';
import RouteTypeFilter from '@src/components/features/planner/definition/atoms/RouteTypeFilter';
import PlannerOperatorsFilter from '@src/components/features/planner/definition/molecules/PlannerOperatorsFilter';
import { useTranslate } from '@src/context/languageContext'
import { plannerInformation, plannerSlice } from '@src/redux/slices/plannerSlice';
import { TypeRouteFilter } from '@src/types/PlannerInterfaces';
import React, { useState } from 'react'
import { Platform, SafeAreaView, ScrollView, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';

export default function PlannerPreferencesScreen() {
  const t = useTranslate();
  const navigation = useNavigation()
  const plannerInfo = useSelector(plannerInformation);
  const dispatch = useDispatch();
  //const { checkPlannerPreferences } = PlannerPresenter();
  const [accesibilityFilter, setAccesibilityFilter] = useState(plannerInfo.accessibilityFilter);
  const [routeFilter, setRouteFilter] = useState<TypeRouteFilter>(plannerInfo.routeTypeFilter);
  const [operatorsFilter, setOperatorsFilter] = useState<Array<number>>(
    plannerInfo.operatorFilters,
  );

  function savePreferences() {
    dispatch(plannerSlice.actions.updateAccesibility(accesibilityFilter));
    dispatch(plannerSlice.actions.updateRouteType(routeFilter));
    dispatch(plannerSlice.actions.updateOperators(operatorsFilter));
    navigation.goBack();
  }

  function undoChanges() {
    setAccesibilityFilter(false);
    setRouteFilter(TypeRouteFilter.FAST);
    setOperatorsFilter([]);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <ScreenTitle
            title={t('planner_preferences')}
            showThirdButton={true}
            buttonText={t('button_undo')}
            onPressOptionalButton={undoChanges}
            accessibilityHintOptionalButton={t('accessibility_planner_preferences_button_undo')}
        />
        <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
          <AccessibilityFilter
            selected={accesibilityFilter}
            onPress={() => setAccesibilityFilter(!accesibilityFilter)}
          />
          <RouteTypeFilter
            selected={routeFilter} 
            setSelected={setRouteFilter}
          />
          <PlannerOperatorsFilter
            selectedOperators={operatorsFilter}
            setSelectedOperators={setOperatorsFilter}
          />
        </ScrollView>
        <View style={[{padding: 16,}, Platform.OS === 'ios' ? {paddingBottom: 32} : {}]}>
          <Button
            title={t('button_save')}
            disabled={false}
            onPress={savePreferences}
            accessibilityHint={t('accessibility_planner_preferences_button_confirm')}
          />
        </View>
    </SafeAreaView>
  )
}
