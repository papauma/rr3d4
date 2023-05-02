import React, { useEffect } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Label from '../text/Label';
import Icon from '../icon/Icon';

export interface SnackBarStyleProps {
  content?: StyleProp<ViewStyle>;
  bar?: StyleProp<ViewStyle>;
  text?: StyleProp<TextStyle>;
  elementsView?: StyleProp<ViewStyle>;
}

export interface SnackBarProps {
  style?: SnackBarStyleProps;
  text: string;
  icon?: any;
  close?: boolean;
  onPress?: Function;
  time?: number;
  tintColor?: string;
  children?: any;
}

export default function SnackBar(props: SnackBarProps) {
  useEffect(() => {
    setTimeout(() => {
      props.onPress?.();
    }, props.time ?? 2500);
  }, [props.onPress, props.time]);

  return (
      <View style={[styles().bar, props.style?.bar]}>
        <View style={[styles().row, props.style?.elementsView]}>
          <Icon source={props.icon} style={{ width: 24, height: 24 }} tint={props.tintColor} />
          <Label style={[styles().text, props?.style?.text]}>{props?.text ?? ''}</Label>
        </View>
        {props.children}
      </View>
  );
}

const styles = () =>
  StyleSheet.create({
    bar: {
      borderRadius: 16,
      width: '90%',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '600',
    },
  });
