import Icon from '@src/components/commons/icon/Icon';
import SelectionBox, { OptionMenuSelectionBoxProps } from '@src/components/commons/menu/SelectionBox';
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext';
import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native';

interface SelectorStopTimesProps {
    onRefresh?: Function;
    selectedDay: any;
    setSelectedDay: Function;
    selectedHour: any;
    setSelectedHour: Function;
}

export default function SelectorStopTimes(props: SelectorStopTimesProps) {
  const t = useTranslate();
  const theme = useTheme(); 
  const [collapse, setCollapse] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0); 

  const optionsSelectorTime: Array<OptionMenuSelectionBoxProps> = [
        {
           value: t('planner_timer_now'),
           selected: selectedValue === 0, 
           onPress: () => setSelectedValue(0)
        },
        {
            value: t('planner_timer_departure'),
            selected: selectedValue === 1,
            onPress: () => setSelectedValue(1)
        }
    ]  

  return (
    <View style={{flexDirection: 'row',
                 alignItems: 'center', 
                 justifyContent: 'space-between', 
                 paddingHorizontal: 16, 
                 paddingBottom: 13.5, 
                 backgroundColor: theme.colors.white}}>
            <SelectionBox
              collapse={collapse}
              value={optionsSelectorTime[selectedValue].value}
              icon={theme.drawables.general.Ic_Clock}
              style={{flexGrow: 1}}
              options={optionsSelectorTime}
              setCollapsed={setCollapse}
              styleScroll={{width: '100%'}}
            />
            <TouchableOpacity style={{marginLeft: 8, paddingHorizontal: 8,}} onPress={() => props.onRefresh?.()}>
                <Icon
                    source={theme.drawables.general.Ic_Refresh}
                />
            </TouchableOpacity>
        </View>
  )
}
