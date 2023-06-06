import { useTranslate } from '@src/context/languageContext';
import React from 'react'

export default function useTimeMessages() {
  const t = useTranslate();

  function getSelectedDayPlannerMessage(date: string) {
    let splitDate = date.split('-');
    let formattedDate = new Date(`${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`);
    let dayOfWeek = formattedDate.getDay();
    let dayName = t('weekDaysAbrev')[dayOfWeek];
    let monthIndex = parseInt(splitDate[0]) - 1;
    let monthName =  t('monthsAbrev')[monthIndex].toLowerCase();
    return `${dayName}, ${splitDate[1]} ${monthName}`;
  }
  
  //TO CHANGE
  function timeOfStopsFormatted(hour: string, date: string) {
    let hourFormat = hour.substring(0, 5)
    return `${t('timer_at')} ${hourFormat}`
  }

  return {
    getSelectedDayPlannerMessage,
    timeOfStopsFormatted
  }
}
