import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Label from '../text/Label';
import { useTheme } from '@src/context/themeContext';
import Icon from '../icon/Icon';

export function MenuItem({
  children,
  icon,
  disabled = false,
  disabledTextColor,
  onPress,
  accessibilityHint,
  pressColor = '#e0e0e0',
  style,
  iconSize,
  iconColor,
  textStyle,
  ...props
}) {
  const theme = useTheme();

  return (
    <Pressable
      disabled={disabled}
      accessibilityHint={accessibilityHint}
      accessibilityState={{disabled: disabled, selected: disabled}}
      style={({ pressed }) => ({
        backgroundColor: Platform.OS !== 'android' && pressed ? pressColor : undefined,
      })}
      android_ripple={{ color: pressColor }}
      onPress={onPress}
      {...props}
    >
      <View style={[styles.container, style]}>
        <View style={styles.label}>
          {icon && <Icon source={icon} size={iconSize} tint={iconColor}/>}
          <Label style={[styles.title, icon && {marginLeft: 8}, disabled && { color: disabledTextColor }, textStyle]}>
            {children}
          </Label>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    //height: 48,
    justifyContent: 'center',
    //maxWidth: 248,
    //minWidth: 124,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
    lineHeight: 21,
    //paddingLeft: 10,
  },
});
