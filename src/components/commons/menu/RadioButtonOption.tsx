import React from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import RadioButton, { RadioButtonProps } from '../buttons/RadioButton';
import Label from '../text/Label';

interface RadioButtonOptionProps extends RadioButtonProps {
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
}

export default function RadioButtonOption(props: RadioButtonOptionProps) {
  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center' }, props.viewStyle]} accessible={true}>
      <RadioButton {...props} />
      <Label style={[props.textStyle, { marginLeft: 8 }]}>{props.text}</Label>
    </View>
  );
}
