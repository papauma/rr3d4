import Label from '@src/components/commons/text/Label';
import IconBox from '@src/components/widgets/IconBox';
import { useTranslate } from '@src/context/languageContext';
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
    accessibilityHint?: string;
    onPress?: any;
    onPressPlan?: any;
}

export default function SearchItem(props: SearchItemProps) {
  const theme = useTheme();
  const t = useTranslate()

  return (
    <TouchableOpacity 
        accessibilityHint={props.accessibilityHint}
        style={[styles(theme).container, {justifyContent: 'space-between'}, props.style]} 
        onPress={() => props.onPress?.()}>
        <View style={[styles(theme).container, {flexShrink: 3,
        flex: 1,}]}>
            {props.iconComponent}
            <View style={styles(theme).textContainer}>
                {props.name ? (<Label style={[styles(theme).name]}>{props.name}</Label>) : null}
                {props.address ? (<Label style={[styles(theme).address]}>{props.address}</Label>) : null}
            </View>
        </View>
        <TouchableOpacity style={{marginLeft: 8, flexShrink: 1}} onPress={() => props.onPressPlan?.()}>
            <IconBox
                styleBox={{paddingHorizontal: 10, flexShrink: 1}}
                alt={t('')}
                staticIcon={theme.drawables.general.Ic_Plan}
            />
        </TouchableOpacity>
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

