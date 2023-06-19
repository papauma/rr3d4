import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import LineDetailsSynoptic from './LineDetailsSynoptic';
import {Pressable, StyleSheet, View} from 'react-native';
import Label from '@src/components/commons/text/Label';
import TripleTab, { ITabSection } from '@src/components/commons/menu/TripleTab';
import AlertsOfLineList from './AlertsOfLineList';

interface SelectorDetailsOfLineProps {
  lineData?: any;
  routeColor?: string;
  stopSelected?: number;
  lineId: number;
}

export default function SelectorDetailsOfLine(
  props: SelectorDetailsOfLineProps,
) {
  const theme = useTheme();
  const t = useTranslate();

  const sections: Array<ITabSection> = [
    {
      title: t('line'),
      content: (
        <LineDetailsSynoptic
          stopTimes={props.lineData}
          routeColor={props.routeColor}
          stopSelected={props.stopSelected}
        />
      ),
    },
    {
      title: t('line_schedule'),
      content: <></>,
    },
    {
      title: t('line_alert'),
      content: <AlertsOfLineList id={props.lineId}/>,
    },
  ];

  return (
    <TripleTab
      sections={sections}
    />
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: theme.colors.gray_200,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 8,
    },
    selectedSection: {
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: theme.colors.primary_300,
    },
    section: {
        
    },
    name: {
      fontWeight: '500',
      color: theme.colors.gray_700,
      fontSize: 14,
      lineHeight: 18.2,
      paddingHorizontal: 23,
      paddingVertical: 11,
    },
    selectedName: {
      fontWeight: '700',
      color: theme.colors.white,
      fontSize: 14,
      lineHeight: 18.2,
      paddingHorizontal: 23,
    },
  });
