import React from 'react'
import Button from '../buttons/Button';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import Label from './Label';

export default function ScreenTitle({
    title,
    onPressBack,
  }: {
    title: string;
    onPressBack?: Function;
  }) {
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <View style={styles(theme).row} accessible={true}>
      <Button
        buttonCategory='secondary'
        onPress={() => {
          navigation.goBack();
          onPressBack?.();
        }}
        icon={theme.drawables.general.Ic_Arrow_Left}
      />
      <Label
        numberOfLines={1}
        ellipsizeMode={'tail'}
        style={styles(theme).title}>
        {title}
      </Label>
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
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 23.4,
      flex: 1,
      marginLeft: 16,
    },
  });