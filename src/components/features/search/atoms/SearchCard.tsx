import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface SearchCardProps {
    style?: StyleProp<ViewStyle>;
    title?: string;
    children?: any;
}

export default function SearchCard(props: SearchCardProps) {
  const theme = useTheme();

  return (
    <View style={[styles(theme).container, props.style]}>
        {props.children}
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: 16, 
        paddingVertical: 12, 
        paddingHorizontal: 8,
    },
    title: {
      textTransform: 'uppercase',
      color: theme.colors.gray_700,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20.8,
      marginBottom: 8,
    },
})