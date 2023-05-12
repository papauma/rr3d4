import React from 'react'
import Button from '../buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import Label from './Label';
import { useTranslate } from '@src/context/languageContext';

export default function ScreenTitle({
    title,
    onPressBack,
    notShowBackButton,
    showThirdButton,
    disabledButton,
    onPressOptionalButton,
    buttonText,
    childrenThirdButton,
    buttonTextStyle,
    styleContainer,
    accessibilityHintOptionalButton,
  }: {
    title: string;
    onPressBack?: Function;
    notShowBackButton?: boolean;
    showThirdButton?: boolean;
    disabledButton?: boolean;
    onPressOptionalButton?: Function;
    buttonText?: string;
    childrenThirdButton?: any;
    buttonTextStyle?: StyleProp<TextStyle>;
    styleContainer?: StyleProp<ViewStyle>;
    accessibilityHintOptionalButton?: string;
  }) {
  const navigation = useNavigation();
  const theme = useTheme();
  const t = useTranslate()

  return (
    <View style={[styles(theme).row, styleContainer]} accessible={true}>
      {!notShowBackButton 
        ? (<Button
          //style={{flexShrink: 1}}
          accessibilityLabel={t('accessibility_button_back_label')}
          accessibilityHint={t('accessibility_button_back_desc')}
          buttonCategory='secondary'
          onPress={() => {
            navigation.goBack();
            onPressBack?.();
          }}
          icon={theme.drawables.general.Ic_Arrow_Left}
        />) 
        : (<View/>)
      }
      {title 
        ? (<Label
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[styles(theme).title, showThirdButton ? {textAlign: 'center',} : {} ]}>
            {title}
          </Label>) 
        : (<View/>)
      }
      {showThirdButton ? (
        <TouchableOpacity accessibilityHint={accessibilityHintOptionalButton} 
              style={{flexShrink: 1}}
              disabled={disabledButton} 
              onPress={() => onPressOptionalButton?.()}>
          {buttonText ? (
            <Label style={buttonTextStyle}>{buttonText}</Label>
          ) : (
            <View />
          )}
          {childrenThirdButton}
        </TouchableOpacity>
      ) : (
        <View  />
      )}
    </View>
  )
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 23.4,
      marginLeft: 16,
      //textAlign: 'center',
      overflow: 'hidden',
      marginHorizontal: 8,
      flex: 1,
    },
  });