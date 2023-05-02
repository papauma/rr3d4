import { ThemeProps, useTheme } from '@src/context/themeContext';
import React from 'react';
import {StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle} from 'react-native';

export interface InputViewProps extends TextInputProps {
    inputStyle?: StyleProp<TextStyle>;
    placeholderTextColor?: string;
    enabled?: boolean;
}

const InputView = React.forwardRef<InputViewProps, any>((props, ref) => {
  const theme = useTheme();

  const onTextChange = (text: string) => {
      if (props.onChangeText) {
        props.onChangeText(text);
      }
  };

  return (
    <TextInput
      ref={ref}
      {...{...props, style: null}}
      style={[styles(theme).input, props.inputStyle]}
      placeholder={props.placeholder}
      placeholderTextColor={props.placeholderTextColor ?? theme.colors.gray_600}
      editable={props.enabled ?? true}
      onChangeText={text => onTextChange(text)}
      maxLength={props.maxLength}
      autoCapitalize={props?.autoCapitalize}
      keyboardType={props?.keyboardType}
    />
  );
});

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    input: {
      fontSize: 14,
      color: theme.colors.gray_800,
      lineHeight: 21,
      fontWeight: '400',
      fontFamily: 'Work Sans'
    },
  });

export default InputView;