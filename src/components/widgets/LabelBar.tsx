import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '../commons/icon/Icon';
import Label from '../commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';

interface LabelBarProps {
  onPressIn?: Function;
  backgroundColor?: string;
  borderColor?: string;
  size?: number;
  onDrawableClick?: Function;
  actionTint?: any;
  actionIcon?: any;
  value?: string;
  placeholder: string;
  icon?: any;
  altAction?: string;
  style?: any;
}

export default function LabelBar(props: LabelBarProps) {
  let placeholder = props.placeholder ?? '';
  const theme = useTheme();
  const t = useTranslate()

  return (
    <TouchableOpacity onPress={() => props.onPressIn?.()} activeOpacity={1} style={{ flex: 1 }}>
      <View
        style={[styles(theme, props.backgroundColor).content, props.style]}
      >
        {props.icon && <Icon alt={props.altAction} source={props.icon} />}
        <View
          //{...props}
          style={[
            styles(theme, props.backgroundColor).input,
            props.style?.input,
          ]}
        >
          {props.value ? (
            <Label style={[{ flex: 1, textTransform: 'capitalize' }, styles(theme).label]} numberOfLines={1} ellipsizeMode={'tail'}>
              {props.value}
            </Label>
          ) : (
            <Label
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={[{ flex: 1 }, styles(theme).label]}
            >
              {placeholder}
            </Label>
          )}
        </View>
        {props.actionIcon && props.value && (
          <TouchableOpacity accessibilityLabel={t('accessibility_button_delete')}
            accessibilityHint={t('accessibility_button_delete_desc')} 
            onPress={() => props.onDrawableClick?.()}>
            <Icon /* alt={'Icono cerrar'} */ tint={props.actionTint} source={props.actionIcon} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = (theme?: ThemeProps, backgroundColor?: any) =>
  StyleSheet.create({
    content: {
      backgroundColor: backgroundColor ?? theme?.colors?.white,
      borderRadius: 16,
      paddingVertical: 12,
      paddingHorizontal: 16,
      //height: size ?? 48,
      alignItems: 'center',
      flexDirection: 'row',
    },
    input: {
      //padding: 0,
      flex: 1,
      //flexBasis: 100,
      flexDirection: 'row',
      marginLeft: 8,
    },
    label: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    }
  });
