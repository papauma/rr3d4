import React from 'react'
import Button from '../buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import Label from './Label';

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
  }) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles(theme).row} accessible={true}>
      {!notShowBackButton 
        ? (<Button
          //style={{flexShrink: 1}}
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
            style={styles(theme).title}>
            {title}
          </Label>) 
        : (<View/>)
      }
      {showThirdButton ? (
        <TouchableOpacity style={{flexShrink: 1}} disabled={disabledButton} onPress={() => onPressOptionalButton?.()}>
          {buttonText ? (
            <Label style={buttonTextStyle}>{buttonText}</Label>
          ) : (
            <View />
          )}
          {childrenThirdButton}
        </TouchableOpacity>
      ) : (
        <View style={{flexShrink: 1}} />
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
      flex: 1,
      marginLeft: 16,
      textAlign: 'center',
      overflow: 'hidden',
      marginHorizontal: 8,
    },
  });