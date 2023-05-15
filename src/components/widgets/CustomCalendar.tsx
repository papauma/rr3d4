import React, { useState, useMemo } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from '../commons/icon/Icon';
import { useTheme } from '@src/context/themeContext';
import { useLanguage, useTranslate } from '@src/context/languageContext';

interface CustomCalendarProps {
  setCurrentDate?: Function; //setea el dia
  accessibilityHint?: string;
}

export default function CustomCalendar(props: CustomCalendarProps) {
  const [selected, setSelected] = useState();
  const theme = useTheme();
  const t = useTranslate()
  const locale = useLanguage()

  LocaleConfig.defaultLocale = locale;

  const marked = useMemo(() => {
    if (selected) {
      return {
        [selected]: {
          selected: true,
          disableTouchEvent: true,

          //selectedColor: R.resources.colors.primary.primary_50,
          //selectedTextColor: R.resources.colors.primary.primary_500,
        },
      };
    } else {
      return undefined;
    }

  }, [selected]);

  return (
    <Calendar
      style={{
        paddingBottom: 10,
        paddingTop: 8,
      }}
      accessibilityLabel={t('accessibility_calendar_name')}
      accessibilityHint={props.accessibilityHint}
      onDayPress={(day: any) => {
        setSelected(day.dateString);
        props.setCurrentDate?.(day);
      }}
      theme={{
        todayBackgroundColor: theme.colors.primary_100,
        todayTextColor: theme.colors.primary_700,
        textMonthFontWeight: '700',
        textMonthFontSize: 16,
        selectedDayBackgroundColor: theme.colors.primary_200,
        selectedDotColor: theme.colors.primary_200,
        selectedDayTextColor: theme.colors.black, 
        stylesheet: {calendar: {
          header: {
            backgroundColor: theme.colors.gray_200,
          },
        },
        marking: {
          borderRadius: 12,
        }
        }
      }}
      headerStyle={{
        
      }}
      firstDay={1}
      markedDates={marked}

      renderArrow={(direction) => (
        <Icon
          accessible={true}
          alt={direction !== 'left' ? t('accessibility_calendar_month_next') : t('accessibility_calendar_month_previous')}
          source={
            direction === 'left'
              ? theme.drawables.general.Ic_Chevron_Left
              : theme.drawables.general.Ic_Chevron_Right
          }
          tintColor={theme.colors.gray_800}
        />
      )}
    />
  );
}
