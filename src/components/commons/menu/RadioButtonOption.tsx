import React from 'react';
import { Pressable, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
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
    <Pressable style={[{ flexDirection: 'row', alignItems: 'center' }, props.viewStyle]} accessible={true} onPress={props.onPress}>
      <RadioButton {...props} />
      <Label style={[props.textStyle, { marginLeft: 8 }]}>{props.text}</Label>
    </Pressable>
  );
}
