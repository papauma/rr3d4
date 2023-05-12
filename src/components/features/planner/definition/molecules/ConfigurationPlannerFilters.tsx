import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import PlannerPresenter from '../../../../../redux/hooks/PlannerPresenter';
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

export default function ConfigurationPlannerFilters() {
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const plannerTimerInfo = useSelector(plannerTimerInformation);
  const plannerInfo = useSelector(plannerInformation);
  const dispatch = useDispatch();
  const theme = useTheme();
  const t = useTranslate();

  /* const { checkPlannerPreferences } = PlannerPresenter();
  let numberFiltersChanged = checkPlannerPreferences(
    plannerInfo.accessibilityFilter,
    plannerInfo.operatorFilters,
    plannerInfo.walkDistance,
  ); */

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View
        style={styles(theme).container}
      >
        <Menu
          visible={showTimeMenu}
          anchor={
            <Pressable
              /* accessibilityHint='Muestra una lista de tipos de momentos en el tiempo para planificar' */
              onPress={() => setShowTimeMenu(!showTimeMenu)}
              accessibilityState={{expanded: showTimeMenu}}
              style={styles(theme).button}
            >
              <Label>
                {plannerTimerInfo.now
                  ? t('planner_timer_now')
                  : plannerTimerInfo.arriveBy
                  ? t('planner_timer_arrive')
                  : t('planner_timer_departure')}
              </Label>
              <Icon
                source={showTimeMenu ? theme.drawables.general.Ic_Chevron_Up : theme.drawables.general.Ic_Chevron_Down}
                size={16}
                //onPress={() => setShowTimeMenu(!showTimeMenu)}
              />
            </Pressable>
          }
          onRequestClose={() => setShowTimeMenu(false)}
          style={{ marginTop: 25, alignItem: 'center' }}
        >
          <MenuItem
            iconType={''}
            /* accessibilityHint={'Tras pulsarse la planificación tomará como hora de salida la actual.'} */
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
            /* accessibilityHint={'Tras pulsarse la planificación tomará como fecha y hora de salida la que se establezca en el selector.'} */
            disabled={!plannerTimerInfo.now && !plannerTimerInfo.arriveBy}
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: theme.colors.gray_200,
            }}
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
            /* accessibilityHint={'Tras pulsarse la planificación tomará como fecha y hora de llegada la que se establezca en el selector.'} */
            disabled={!plannerTimerInfo.now && plannerTimerInfo.arriveBy}
            onPress={() => {
              dispatch(plannerTimerSlice.actions.updateNow(false));
              dispatch(plannerTimerSlice.actions.updateArriveBy(true));
              setShowTimeMenu(false);
            }}
          >
            {t('planner_timer_arrive')}
          </MenuItem>
        </Menu>
        {/* <AccordionOption
          name={`Preferencias ${numberFiltersChanged === 0 ? '' : `(${numberFiltersChanged})`}`}
          onPress={() => setShowPreferencesModal(true)}
          styleText={
            numberFiltersChanged === 0 ? {} : { color: R.resources.colors.primary.primary_500 }
          }
        /> */}
        <Pressable
              /* accessibilityHint='Muestra una lista de tipos de momentos en el tiempo para planificar' */
              onPress={() => setShowPreferencesModal(!showPreferencesModal)}
              accessibilityState={{expanded: showPreferencesModal}}
              style={[styles(theme).button, {marginLeft: 8}]}
            >
              <Label>
                {t('planner_preferences')}
              </Label>
              <Icon
                source={theme.drawables.general.Ic_Chevron_Right}
                size={16}
                //onPress={() => setShowTimeMenu(!showTimeMenu)}
              />
            </Pressable>
      </View>
      {/* {!plannerTimerInfo.now ? <HourAndCalendarSelectionButtons /> : null} */}
      {/* {showPreferencesModal ? (
        <PlannerPreferencesModal
          visible={showPreferencesModal}
          setVisible={() => setShowPreferencesModal(false)}
        />
      ) : null} */}
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
    flex: 1,
    alignItems: 'center',
  }
})
