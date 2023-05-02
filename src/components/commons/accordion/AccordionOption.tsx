import React from 'react';
import { Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';
import Label from '../text/Label';

interface AccordionOptionProps {
  name?: string;
  styleView?: StyleProp<ViewStyle>;
  styleText?: StyleProp<TextStyle>;
  accessibilityHint?: string;
  pressed?: boolean;
  onPress?: Function;
}

export default function AccordionOption(props: AccordionOptionProps) {
  return (
    <Pressable
      accessibilityLabel={props.name}
      accessibilityHint={props.accessibilityHint}
      onPress={props.onPress}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          width: 142,
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 8,
        },
        props.styleView,
      ]}
    >
      {props.name ? <Label style={[props.styleText]}>{props.name}</Label> : null}
    </Pressable>
  );
}
