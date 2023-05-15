import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface SearchCardProps {
    style?: StyleProp<ViewStyle>;
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
})