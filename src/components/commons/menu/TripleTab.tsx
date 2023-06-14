import { ThemeProps, useTheme } from '@src/context/themeContext';
import React, { useState } from 'react'
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Label from '../text/Label';

export interface ITabSection {
    title: string;
    content: any; 
}

interface TripleTabProps {
    sections: Array<ITabSection>;
    styleContainer?: StyleProp<ViewStyle>;
}

export default function TripleTab(props: TripleTabProps) {
  const theme = useTheme();
  const [showContentType, setShowContentType] = useState(0);

  return (
    <>
      <View style={[styles(theme).container, props.styleContainer]}>
        {props.sections.map((section: any, index: number) => (
          <Pressable
            key={index}
            onPress={() => setShowContentType(index)}
            style={[
              index === showContentType
                ? styles(theme).selectedSection
                : styles(theme).section,
                {flexGrow: 1}
            ]}>
            <Label
              style={[
                index === showContentType
                  ? styles(theme).selectedName
                  : styles(theme).name,
                {textAlign: 'center'}
              ]}>
              {section.title}
            </Label>
          </Pressable>
        ))}
      </View>
      {props.sections[showContentType]?.content}
    </>
  )
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
