import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { eachDayOfInterval } from 'date-fns';
import WheelPicker from 'react-native-wheely';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';

interface DateInterval {
  dateValue: Date;
  name: string;  
}

export default function DateSelectorModal(props: any) {
  const t = useTranslate();
  let nowDate = new Date();
  let year = nowDate.getFullYear();
  let endDate = new Date().setFullYear(year + 1);
  const intervalDates = eachDayOfInterval({ start: nowDate, end: endDate });
  intervalDates.pop();
  let infoIntervals = intervalDates.map((date: Date) => {
    let newDateFormatted: DateInterval = {
        dateValue: date,
        name: `${t('weekDaysAbrev')[date.getDay()].toLowerCase()}, ${date.getDate()} ${t('monthsAbrev')[date.getMonth() + 1].toLowerCase()}`
    } 
    return newDateFormatted;
  })

  const theme = useTheme();
  const [day, setDay] = useState(intervalDates[0]);

  return (
    <View style={styles.content}>
        <WheelPicker
            flatListProps={{accessible: true}}
            selectedIndicatorStyle={[{backgroundColor: theme.colors.primary_100}, styles.selectedIndicatorStyle]}
            itemTextStyle={{fontSize: 16, fontWeight: '700', lineHeight: 20.8}}
            options={infoIntervals.map((element: DateInterval) => element.name)}
            selectedIndex={0}
            onChange={(index) => {
                props && props.callback && props.callback({ date: infoIntervals[index].dateValue});
            }}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    content: {
        //backgroundColor: R.resources.colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
        //justifyContent: 'space-between',
        //paddingHorizontal: 97.5
      },
      selectedIndicatorStyle: {
        width: '100%',
        left: -15,
        padding: 20,
        
        borderRadius: 16,
      },
})