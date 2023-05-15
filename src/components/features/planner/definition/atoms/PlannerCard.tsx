import Label from '@src/components/commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

interface PlannerCardProps {
    style?: StyleProp<ViewStyle>;
    title?: string;
    children?: any;
}

export default function PlannerCard(props: PlannerCardProps) {
    const theme = useTheme();

    return (
      <View style={[styles(theme).container, props.style]} accessible={true}>
        {props.title ? (<Label style={[styles(theme).title]}>{props.title}</Label>) : null}
        {props.children}
      </View>
    )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: 16, 
        padding: 16,
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