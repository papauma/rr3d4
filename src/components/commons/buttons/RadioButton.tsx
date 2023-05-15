import { useTheme } from '@src/context/themeContext';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, Pressable } from 'react-native';
import Icon from '../icon/Icon';

export interface RadioButtonProps {
  selected?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: any;
}

export default function RadioButton(props: RadioButtonProps) {
  const theme = useTheme()

  return (
    <Pressable
      accessibilityLabel={props.accessibilityLabel}
      accessibilityState={{selected: props.selected}}
      style={[
        styles.unSelected,
        props.style,
        {
          borderColor: props.selected
            ? theme.colors.primary_300
            : theme.colors.gray_500,
        },
      ]}
      onPress={props.onPress}
    >
      {props.selected ? (
        <Icon
          source={theme.drawables.general.Ic_Circle}
          tint={theme.colors.primary_300}
          size={16}
        />
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  unSelected: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
