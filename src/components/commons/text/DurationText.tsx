import React from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import Label from './Label';

interface DurationTextProps {
  duration: number;
  styleNumber?: StyleProp<TextStyle>;
  styleLetter?: StyleProp<TextStyle>;
}

export default function DurationText(props: DurationTextProps) {
  let hoursDuration = props.duration / 60 >= 1 ? parseInt(props.duration / 60 as any) : null;
  let minutesDuration = hoursDuration ? props.duration % 60 : props.duration;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} accessible={true} accessibilityLabel={hoursDuration ? `${hoursDuration} h ${minutesDuration} min` : `${minutesDuration} min`}>
      <Label style={[styles.numberBig, props.styleNumber]}>
        {hoursDuration ? `${hoursDuration} ` : ''}
      </Label>
      {hoursDuration ? <Label style={[styles.number, {marginRight: 2}, props.styleLetter]}>{'h'}</Label> : null}
      <Label style={[styles.numberBig, props.styleNumber]}>{`${minutesDuration} `}</Label>
      <Label style={[styles.number, props.styleLetter]}>{'min'}</Label>
    </View>
  );
}

const styles = StyleSheet.create({
  numberBig: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
  },
  number: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18.2,
  },
});
