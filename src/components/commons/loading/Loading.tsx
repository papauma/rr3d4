import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import Label from '../text/Label';

export default function Loading(props: any) {
  const theme = useTheme();
  const t = useTranslate();

  return (
    <View style={[styles(theme).content, props.style?.content]}>
      <View style={[styles(theme).box, props.style?.box]}>
        <View style={styles(theme).row} accessible={true}>
          <ActivityIndicator
            size={props.size ?? 'large'}
            color={props.color ?? theme.colors.black}
          />
          <Label style={styles(theme).text}>{t('component_loading')}</Label>
        </View>
      </View>
    </View>
  );
}

const styles = (theme: any) =>
  StyleSheet.create({
    content: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    box: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 250,
      height: 64,
      borderRadius: 16,
      backgroundColor: theme.colors.white,
      borderWidth: 1,
      borderColor: theme.colors.neutralBorder,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: '600',
    },
  });
