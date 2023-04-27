import React from 'react';
import {StyleProp, Text, TextStyle} from 'react-native';

export interface LabelProps {
  style?: StyleProp<TextStyle>;
  ellipsizeMode?: any;
  numberOfLines?: number;
  accessible?: boolean;
  children: any;
}

export default function Label(props: LabelProps) {
  return props.children ? (
    <Text
      accessible={props.accessible}
      style={[{fontFamily: 'Work Sans'}, props?.style]}
      numberOfLines={props.numberOfLines}
      ellipsizeMode={props.ellipsizeMode}>
      {props.children}
    </Text>
  ) : null;
}
