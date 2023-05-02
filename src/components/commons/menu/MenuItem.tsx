import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Label from '../text/Label';
import Icon from '../icon/Icon';
import { useTheme } from '@src/context/themeContext';

export function MenuItem({
  children,
  iconType,
  disabled = false,
  disabledTextColor,
  onPress,
  accessibilityHint,
  pressColor = '#e0e0e0',
  style,
  textStyle,
  ...props
}) {
  const theme = useTheme();

  const getIcon = () => {
    switch (iconType) {
      case 'contact':
        return <Icon />;
      case 'share':
        return <Icon />;
      case 'accesible':
        return <Icon />;
      case 'alert':
        return <Icon />;
      case 'deleteAlert':
        return <Icon />;
      case 'report':
        return <Icon />;
      case 'favorite':
        return <Icon />;
      case 'time':
        return <Icon />;
      case 'deleteFavorite':
        return <Icon />;
      default:
        return null;
    }
  };

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
          {getIcon()}
          <Label style={[styles.title, disabled && { color: disabledTextColor }, textStyle]}>
            {children}
          </Label>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
    maxWidth: 248,
    minWidth: 124,
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
    paddingLeft: 10,
  },
});
