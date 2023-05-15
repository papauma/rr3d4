import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import WheelPicker from 'react-native-wheely';
import Label from '../commons/text/Label';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';

interface HoursWheelProps {
  callback?: Function;
  isActive?: any;
}

export default function HoursWheel(props: HoursWheelProps) {
  // const hour
  const [hour, setHour] = useState(new Date().getHours());
  const [minute, setMinute] = useState(new Date().getMinutes());
  const theme = useTheme()
  const t = useTranslate()

  useEffect(() => {
    if (props && props.callback) {
      props.callback({
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
      });
    }
  }, []);
  return (
    <View style={[styles.container, props.isActive]}>
      <View accessible={true} accessibilityRole='list'
        accessibilityLabel={t('accessibility_hour_selector_label')}
        accessibilityHint={t('accessibility_hour_selector_desc')}
        accessibilityValue={{min: 0, max: 23, now: hour ?? 0}}
      >
        <WheelPicker
          selectedIndex={hour}
          flatListProps={{accessible: true}}
          selectedIndicatorStyle={[{backgroundColor: theme.colors.primary_100, 
            color:theme.colors.gray_700,
          }, styles.selectedIndicatorStyle]}
          options={defineNumbers(23)}
          onChange={(index) => {
            setHour(index);
            props && props.callback && props.callback({ hour: index });
          }}
        />
      </View>
      <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
        <Label style={[styles.colonSign, {color: theme.colors.gray_700}]}>:</Label>
      </View>
      <View accessible={true} role='list'
        accessibilityLabel={t('accessibility_minute_selector_label')}
        accessibilityHint={t('accessibility_minute_selector_desc')}
        accessibilityValue={{min: 0, max: 59, now: minute ?? 0}}
      >
      <WheelPicker
        flatListProps={{accessible: true}}
        selectedIndicatorStyle={[{backgroundColor: theme.colors.primary_100}, styles.selectedIndicatorStyle]}
        options={defineNumbers(59)}
        selectedIndex={minute}
        onChange={(index) => {
          setMinute(index);
          props && props.callback && props.callback({ minute: index });
        }}
      />
      </View>
    </View>
  );

  function defineNumbers(cuantityNumbers) {
    const defineNumbers: Array<number> = [];
    for (let index = 0; index <= cuantityNumbers; index++) {
      defineNumbers.push(index);
    }
    return defineNumbers;
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: R.resources.colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    //justifyContent: 'space-between',
    width: '100%',
    //paddingHorizontal: 97.5
  },
  selectedIndicatorStyle: {
    width: 80,
    //borderBottomWidth: 1,
    //borderTopWidth: 1,
    //backgroundColor: R.resources.colors.white,
    //borderColor: R.resources.colors.primary.primary_100,
    left: -15,
    padding: 20,
    
    borderRadius: 16,
    //color: R.resources.colors.primary.primary_500,
  },
  colonSign: {
    //color: R.resources.colors.primary.primary_500,
    fontWeight: '700',
    fontSize: 18,
  },
});
