import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { plannerInformation } from '../../../../../redux/slices/plannerSlice';
import {
  plannerTimerInformation,
  plannerTimerSlice,
} from '../../../../../redux/slices/plannerTimerSlice';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import { Menu } from '@src/components/commons/menu/Menu';
import Label from '@src/components/commons/text/Label';
import { MenuItem } from '@src/components/commons/menu/MenuItem';
import Icon from '@src/components/commons/icon/Icon';
import AccordionButton from '@src/components/commons/buttons/AccordionButton';
import HourAndCalendarSelectionButtons from '../../timer/HourAndCalendarSelectionButtons';
import { useNavigation } from '@react-navigation/native';
import { navigationPages } from '@src/utils/constants';
import usePlannerInfo from '@src/redux/hooks/planner/usePlannerInfo';

export default function ConfigurationPlannerFilters() {
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const plannerTimerInfo = useSelector(plannerTimerInformation);
  const plannerInfo = useSelector(plannerInformation);
  const dispatch = useDispatch();
  const theme = useTheme();
  const t = useTranslate();
  const navigation = useNavigation()

  const { checkPlannerPreferences } = usePlannerInfo();
  let numberFiltersChanged = checkPlannerPreferences(
    plannerInfo.accessibilityFilter,
    plannerInfo.routeTypeFilter,
    plannerInfo.operatorFilters,
  );

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={styles(theme).container}
      >
        <Menu
          visible={showTimeMenu}
          anchor={
            <AccordionButton
              title={plannerTimerInfo.now
                ? t('planner_timer_now')
                : plannerTimerInfo.arriveBy
                ? t('planner_timer_arrive')
                : t('planner_timer_departure')}
                onPress={() => setShowTimeMenu(!showTimeMenu)}
               accessibilityHint={t('accessibility_planner_timer_button_desc')}   
            />
          }
          onRequestClose={() => setShowTimeMenu(false)}
          style={{ marginTop: 25, alignItem: 'center' }}
        >
          <MenuItem
            iconType={''}
            accessibilityHint={t('accessibility_planner_timer_now_button_desc')}
            style={[styles(theme).menuItem]}
            disabled={plannerTimerInfo.now}
            onPress={() => {
              dispatch(plannerTimerSlice.actions.updateNow(true));
              setShowTimeMenu(false);
            }}
          >
            {t('planner_timer_now')}
          </MenuItem>
          <MenuItem
            iconType={''}
            accessibilityHint={t('accessibility_planner_timer_departure_button_desc')}
            disabled={!plannerTimerInfo.now && !plannerTimerInfo.arriveBy}
            style={[{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: theme.colors.gray_200,
            }, styles(theme).menuItem]}
            onPress={() => {
              dispatch(plannerTimerSlice.actions.updateNow(false));
              dispatch(plannerTimerSlice.actions.updateArriveBy(false));
              setShowTimeMenu(false);
            }}
          >
            {t('planner_timer_departure')}
          </MenuItem>
          <MenuItem
            iconType={''}
            accessibilityHint={t('accessibility_planner_timer_arrival_button_desc')}
            disabled={!plannerTimerInfo.now && plannerTimerInfo.arriveBy}
            style={[styles(theme).menuItem]}
            onPress={() => {
              dispatch(plannerTimerSlice.actions.updateNow(false));
              dispatch(plannerTimerSlice.actions.updateArriveBy(true));
              setShowTimeMenu(false);
            }}
          >
            {t('planner_timer_arrive')}
          </MenuItem>
        </Menu>
        <Pressable
              accessibilityHint={t('accessibility_planner_preferences_button_desc')}
              onPress={() => navigation.navigate(navigationPages.plannerPreferences)}
              style={[styles(theme).button, {marginLeft: 8}]}
            >
              <Label >
                {numberFiltersChanged !== 0 
                  ? `${t('planner_preferences')} (${numberFiltersChanged})` 
                  : t('planner_preferences')}
              </Label>
              <Icon
                source={theme.drawables.general.Ic_Chevron_Right}
                size={16}
              />
            </Pressable>
      </View>
      {!plannerTimerInfo.now ? <HourAndCalendarSelectionButtons /> : null}
    </View>
  );
}

const styles = (theme: ThemeProps) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
    flexShrink: 1,
    flexGrow: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    //flex: 1,
    alignItems: 'center',
  },
  menuItem: {
    paddingVertical: 9.5,
    width: '100%',
  }
})
