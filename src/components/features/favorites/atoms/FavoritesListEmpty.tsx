import Button from '@src/components/commons/buttons/Button';
import Label from '@src/components/commons/text/Label';
import { useTranslate } from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface FavoritesListEmptyProps {
  title?: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
}

export default function FavoritesListEmpty(props: FavoritesListEmptyProps) {
  const theme = useTheme();
  const t = useTranslate();

  return (
    <View style={[styles(theme).content, props.style]}>
      {props.title ? (
        <Label style={styles(theme).title}>{props.title}</Label>
      ) : undefined}
      {props.description ? (
        <Label style={styles(theme).description}>{props.description}</Label>
      ) : undefined}
      <Button
        title={t('favorites_empty_explore')}
        style={{width: '100%'}}
      />
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    content: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 23.4,
      textAlign: 'center',
    },
    description: {
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      textAlign: 'center',
      color: theme.colors.gray_700,
      marginTop: 8,
      marginBottom: 24,
      paddingHorizontal: 16,
    },
  });
