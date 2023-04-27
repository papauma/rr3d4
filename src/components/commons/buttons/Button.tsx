import React from 'react';
import { Pressable, StyleProp, ViewStyle, View, TextStyle, StyleSheet } from 'react-native';
import Label from '../text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import Icon from '../icon/Icon';

export interface ButtonProps {
    style?: StyleProp<ViewStyle>;
    onPress?: Function;
    onLongPress?: Function;
    disabled?: boolean;
    styleView?: StyleProp<ViewStyle>;
    icon?: any;
    iconStyle?: any;
    title?: string;
    textStyle?: StyleProp<TextStyle>;
    tintColor?: string; //color del icono
    accessibilityLabel?: string;
    accessibilityHint?: string;
    buttonSizeStyle?: ButtonSizeTypes;
    buttonCategory?: ButtonCategoryTypes;
    alt?: string;
}

type ButtonSizeTypes =
    | 'extra-small'
    | 'small'
    | 'medium'

type ButtonCategoryTypes = 
  | 'primary'
  | 'secondary'
  | 'tertiary'

export default function Button(props: ButtonProps) {
  const theme = useTheme();
    
  function obtainButtonSize(buttonSize? : ButtonSizeTypes) {
    if (buttonSize === 'extra-small') {
        return styles(theme).buttonExtraSmall
    } else if (buttonSize === 'medium') {
        return styles(theme).buttonMedium
    } else {
        return styles(theme).buttonSmall
    }
  }  
  function obtainTextStyleBySize(buttonSize? : ButtonSizeTypes) {
    if (buttonSize === 'extra-small') {
        return styles(theme).textExtraSmall
    } else if (buttonSize === 'medium') {
        return styles(theme).textMedium
    } else {
        return styles(theme).textSmall
    }
  }  
  function obtainIconStyleBySize(buttonSize? : ButtonSizeTypes) {
    if (buttonSize === 'extra-small') {
        return styles(theme).iconExtraSmall
    } else if (buttonSize === 'medium') {
        return styles(theme).iconMedium
    } else {
        return styles(theme).iconSmall
    }
  } 
  function obtainButtonCategoryStyleDefault(category? : ButtonCategoryTypes) {
    if (category === 'secondary') {
        return styles(theme).buttonSecondary
    } else if (category === 'tertiary') {
        return styles(theme).buttonTertiary
    } else {
        return styles(theme).buttonPrimary
    }
  }  
  function obtainButtonCategoryStyleDisabled(category? : ButtonCategoryTypes) {
    if (category === 'secondary') {
      return styles(theme).buttonSecondaryDisabled
  } else if (category === 'tertiary') {
      return styles(theme).buttonTertiaryDisabled
  } else {
      return styles(theme).buttonPrimaryDisabled
  }
  } 
  function obtainButtonCategoryStylePressed(category? : ButtonCategoryTypes) {
    if (category === 'secondary') {
      return styles(theme).buttonSecondaryPressed
  } else if (category === 'tertiary') {
      return styles(theme).buttonTertiaryPressed
  } else {
      return styles(theme).buttonPrimaryPressed
  }
  } 
  function obtainTextCategoryStyleDefault(category? : ButtonCategoryTypes) {
    if (category === 'secondary') {
        return styles(theme).textColorGray
    } else if (category === 'tertiary') {
        return styles(theme).textColorGray
    } else {
        return styles(theme).textColorWhite
    }
  }  

    return (
        <Pressable
          accessible={true}
          accessibilityLabel={props.accessibilityLabel}
          accessibilityHint={props.accessibilityHint}
          style={({ pressed }) => [
            styles().button,
            obtainButtonCategoryStyleDefault(props.buttonCategory),
            obtainButtonSize(props.buttonSizeStyle),
            props.style,
            props.disabled ? obtainButtonCategoryStyleDisabled(props.buttonCategory) : null,
            pressed ? obtainButtonCategoryStylePressed(props.buttonCategory) : null,
          ]}
          onPress={() => props.onPress?.()}
          onLongPress={() => props.onLongPress?.()}
          disabled={props.disabled}
        >
          <View style={[styles().viewButton, props.styleView]} >
            {props.icon && (
              <Icon
                alt={props.alt}
                source={props.icon}
                style={[
                  props.buttonCategory === 'secondary' ||  props.buttonCategory === 'tertiary' 
                    ? {tintColor: theme.colors.gray_700}
                    : {tintColor: theme.colors.white},
                    props.disabled &&
                    (props.buttonCategory === 'secondary' ||
                    props.buttonCategory === 'tertiary') ? {tintColor: theme.colors.gray_400} : null,
                  obtainIconStyleBySize(props.buttonSizeStyle),
                  props.iconStyle,
                  !props.title ? { marginRight: 0 } : null]}
                tint={props.tintColor}
              />
            )}
            {props.title ? (
              <Label style={[obtainTextCategoryStyleDefault(props.buttonCategory),
                         obtainTextStyleBySize(props.buttonSizeStyle),
                         props.disabled &&
                         (props.buttonCategory === 'secondary' ||
                         props.buttonCategory === 'tertiary') ? {color: theme.colors.gray_400} : null,
                          props.textStyle]}>
                {props.title}
              </Label>
            ) : null}
          </View>
        </Pressable>);
}
const styles = (theme?: ThemeProps) => StyleSheet.create({
    buttonPrimary: {
        backgroundColor: theme?.colors?.primary_300,
    },
    buttonSecondary: {
      backgroundColor: theme?.colors?.white,
   },
   buttonTertiary: {
    backgroundColor: theme?.colors?.white,
    borderColor: theme?.colors.primary_300,
    borderWidth: 1.5,
 },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
    },
    buttonPrimaryDisabled: {
        backgroundColor: theme?.colors?.gray_400,
    },
    buttonSecondaryDisabled: {
      backgroundColor: theme?.colors?.white,
    },
    buttonTertiaryDisabled: {
      backgroundColor: theme?.colors?.white,
      borderColor: theme?.colors.gray_400,
      borderWidth: 2,
    },
    buttonPrimaryPressed: {
        backgroundColor: theme?.colors?.primary_500,
    },
    buttonSecondaryPressed: {
      backgroundColor: theme?.colors?.white,
      borderColor: theme?.colors?.gray_700,
      borderWidth: 1,
    },
    buttonTertiaryPressed: {
      backgroundColor: theme?.colors?.white,
      borderColor: theme?.colors.gray_500,
      borderWidth: 2,
  },
    viewButton: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonExtraSmall: {
        paddingHorizontal: 12,
        paddingVertical: 10,
    },
    buttonSmall: {
        paddingHorizontal: 14,
        paddingVertical: 11,
    },
    buttonMedium: {
        paddingHorizontal: 16,
        paddingVertical: 13.5,
    },
    textExtraSmall: {
      fontSize: 12,
      lineHeight: 15.6,
      fontWeight: '700',
    },
    textSmall: {
      fontSize: 14,
      lineHeight: 18.2,
      fontWeight: '700',
    },
    textMedium: {
      fontSize: 16,
      lineHeight: 20.8,
      fontWeight: '700',
    },
    textColorWhite: {
      color: theme?.colors?.white,
    },
    textColorGray: {
      color: theme?.colors?.gray_700,
    },
    iconExtraSmall: {
      marginRight: 4,
      width: 16,
      height: 16,
    },
    iconSmall: {
      marginRight: 6,
      width: 24,
      height: 24,
    },
    iconMedium: {
      marginRight: 8,
      width: 32,
      height: 32,
    },
})
