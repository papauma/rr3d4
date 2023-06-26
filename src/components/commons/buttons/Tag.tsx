import { ThemeProps, useTheme } from '@src/context/themeContext';
import React from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import IconDynamic from '../icon/IconDynamic';
import Label from '../text/Label';

interface TagProps {
  selected?: boolean;
  //styleTag?: StyleProp<ViewStyle>;
  iconId?: any;
  staticIcon?: any;
  onPress?: Function;
  title?: string;
  disabled?: boolean;
  iconStyle?: any;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export default function Tag(props: TagProps) {
  const theme = useTheme()

  return (
    <Pressable
      style={({ pressed }) => [
        styles(theme).container
        , props.selected
          ? {
              backgroundColor: theme.colors.primary_300,
            }
          : {
            backgroundColor: theme.colors.white,
            borderWidth: 1,
            borderColor: theme.colors.gray_400
          },
          props.style,
      ]}
      onPress={() => props.onPress?.()}
      disabled={props.disabled}
    >
        {props.staticIcon || props.iconId ? (
          <IconDynamic
            accessible={false}
            source={props.staticIcon}
            iconId={props.iconId}
            style={[props.iconStyle, { marginRight: props.title ? 10 : 0 }]}
            color={props.selected ? theme.colors.primary_800 : theme.colors.gray_700}
          />
        ) : null}
        {props.title ? (
          <Label
            style={[
              props.selected ? styles(theme).textSelected : styles(theme).text,
              props.textStyle,
            ]}
          >
            {props.title}
          </Label>
        ) : null}
    </Pressable>
  );
}

const styles = (theme: ThemeProps) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
  },
  text: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
    color: theme.colors.gray_700,
  },
  textSelected: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18.2,
    color: theme.colors.primary_800,
  }
})
