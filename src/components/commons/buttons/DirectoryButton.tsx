import {ThemeProps, useTheme} from '@src/context/themeContext';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Label from '../text/Label';
import Icon from '../icon/Icon';

interface DirectoryButtonProps {
  accessibilityHint?: string;
  name?: string;
  icon?: any;
  onPress?: Function;
}

export default function DirectoryButton(props: DirectoryButtonProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity
      accessibilityHint={props.accessibilityHint}
      style={{marginTop: 12, marginRight: 8, width: 80, alignItems: 'center'}}
      onPress={() => props.onPress?.()}>
      <View style={styles(theme).bigCircle}>
        <View style={styles(theme).smallCircle}>
          <Icon source={props.icon} tint={theme.colors.white} />
        </View>
      </View>
      {props.name ? (
        <Label style={styles(theme).name}>{props.name}</Label>
      ) : null}
    </TouchableOpacity>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    name: {
      color: theme.colors.gray_700,
      fontWeight: '700',
      fontSize: 12,
      lineHeight: 15.6,
      textAlign: 'center',
      marginTop: 4,
    },
    bigCircle: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.primary_300,
      borderWidth: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    smallCircle: {
      backgroundColor: theme.colors.primary_300,
      width: 54,
      height: 54,
      borderRadius: 27,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
