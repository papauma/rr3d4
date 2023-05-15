import AccordionButton from '@src/components/commons/buttons/AccordionButton';
import useTimeMessages from '@src/redux/hooks/time/useTimeMessages';
import { plannerTimerInformation, plannerTimerSlice } from '@src/redux/slices/plannerTimerSlice';
import TimeUtils from '@src/utils/TimeUtils';
import React, { useState } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import CalendarSelectionModal from './CalendarSelectionModal';
import { contextualSlice } from '@src/redux/slices/contextualSlice';
import { useTranslate } from '@src/context/languageContext';
import HourSelectionModal from './HourSelectionModal';

/* import CalendarSelectionModal from './CalendarSelectionModal';
import HourSelectionModal from './HourSelectionModal'; */

export default function HourAndCalendarSelectionButtons() {
  const dispatch = useDispatch();
  const t = useTranslate()
  const [showHoursSelection, setShowHoursSelection] = useState(false);
  const [showCalendarSelection, setShowCalendarSelection] = useState(false);
  const plannerTimerInfo = useSelector(plannerTimerInformation);
  let selectedHour = TimeUtils.convertTime12to24(plannerTimerInfo.time);
  const {getSelectedDayPlannerMessage} = useTimeMessages()

  function setCalendarDate(date: any) {
    let formatedDate: string = `${date.month}-${date.day}-${date.year}`;
    dispatch(plannerTimerSlice.actions.updateDate(formatedDate));
  }

  function setHoursTimer(hourSelected: any) {
    dispatch(plannerTimerSlice.actions.updateTime(hourSelected));
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        //width: '100%',
        alignItems: 'center',
        //flex: 1,
        marginTop: 8,
      }}
    >
      <AccordionButton
        accessibilityHint={t('accessibility_hour_modal')}
        title={selectedHour.length > 5 ? selectedHour.substring(1) : selectedHour}
        onPress={() => {
          setShowHoursSelection(true)
          dispatch(contextualSlice.actions.updateShowBackground(true))
        }}
        collapsed={showHoursSelection}
      />
      <AccordionButton
        accessibilityHint={t('accessibility_calendar_modal_desc')}
        style={{marginLeft: 5}}
        title={getSelectedDayPlannerMessage(plannerTimerInfo.date)}
        onPress={() => {
          setShowCalendarSelection(true)
          dispatch(contextualSlice.actions.updateShowBackground(true))
        }}
        collapsed={showCalendarSelection}
      />

      {showCalendarSelection && (
        <CalendarSelectionModal
          showModal={showCalendarSelection}
          accessibilityHint={t('accessibility_calendar_planner_desc')}
          setShowModal={() => {
            setShowCalendarSelection(false)
            dispatch(contextualSlice.actions.updateShowBackground(false))
          }}
          selectionDate={setCalendarDate}
        />
      )}
      {showHoursSelection && (
        <HourSelectionModal
          showModal={showHoursSelection}
          setShowModal={() => {
            setShowHoursSelection(false)
            dispatch(contextualSlice.actions.updateShowBackground(false))
          }}
          selectionHour={setHoursTimer}
          arriveBy={plannerTimerInfo.arriveBy}
        />
      )}
    </View>
  );
}
