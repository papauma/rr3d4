import Label from '@src/components/commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import React from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'

interface SearchItemProps {
    /**
     * @param iconComponent es un atributo en el que poder añadir un componente que actué como
     * icono o código de la información a mostrar
     */
    iconComponent?: any;
    name?: string;
    address?: string;
    style?: StyleProp<ViewStyle>;
    onPress?: any;
}

export default function SearchItem(props: SearchItemProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity style={[styles(theme).container, props.style]} onPress={() => props.onPress?.()}>
        {props.iconComponent}
        <View style={styles(theme).textContainer}>
            {props.name ? (<Label style={[styles(theme).name]}>{props.name}</Label>) : null}
            {props.address ? (<Label style={[styles(theme).address]}>{props.address}</Label>) : null}
        </View>
    </TouchableOpacity>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    name: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18.2,
        textTransform: 'capitalize',
        flex: 1,
    },
    address: {
        fontSize: 14,
        fontWeight: '400',
        color: theme.colors.gray_700,
        lineHeight: 21,
        flex: 1,
    },
    textContainer: {
        marginLeft: 8,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})

