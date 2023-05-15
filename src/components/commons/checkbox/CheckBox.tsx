import React, { useEffect, useState } from 'react';
import { Pressable, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import Icon from '../icon/Icon';
import Label from '../text/Label';

interface CheckBoxProps {
  selected?: boolean;
  selectedColor?: string;
  unselectedColor?: string;
  iconSize?: number;
  iconColor?: string;
  size?: number;
  accessibilityHint?: string;
  onPress?: Function;
  style?: StyleProp<ViewStyle>;
  text?: string;
  textStyle?: StyleProp<TextStyle>; 
  styleBox?: StyleProp<ViewStyle>;
}

export default function CheckBox(props: CheckBoxProps) {
  const [checked, setChecked] = useState(props.selected ?? false);
  const theme = useTheme();

  useEffect(() => {
    setChecked(props.selected ?? false);
  }, [props.selected]);

  return (
    <Pressable
      role={'checkbox'}
      accessibilityHint={props.accessibilityHint}
      accessibilityState={{checked: props.selected}}
      onPress={() => {
        setChecked(!checked);
        if (props.onPress) props.onPress();
      }}
      style={[styles(theme, props.size).row, props.style]}
    >
      <View
        style={[
          styles(theme, props.size).box,
          props.styleBox,
          {
            backgroundColor: checked
              ? props.selectedColor ?? theme.colors.primary_200
              : props.unselectedColor ?? theme.colors.white,
          },
        ]}
      >
        {checked && (
          <Icon
            source={theme.drawables.general.Ic_Check}
            style={{ width: props.iconSize ?? 12, height: props.iconSize ?? 12 }}
            tint={props.iconColor ?? theme.colors.white}
          />
        )}
      </View>
      {props.text ? <Label style={[styles(theme, props.size).text, props.textStyle]}>{props.text}</Label> : null}
    </Pressable>
  );
}

const styles = (theme: ThemeProps, size: number | undefined) =>
  StyleSheet.create({
    box: {
      width: size ?? 24,
      height: size ?? 24,
      borderColor: theme.colors.gray_400,
      borderStyle: 'solid',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      fontSize: 16,
      fontWeight: '400',
      marginLeft: 8,
      lineHeight: 24,
      color: theme.colors.gray_700,
    }
  });
