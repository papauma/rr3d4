import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Label from '../text/Label';
import Icon from '../icon/Icon';

export interface LineCodeSemiCircleProps {
    code?: string; //codigo de la linea, carretera...
    backgroundColor?: string; //color de fondo (color de ruta)
    textColor?: string; //color del texto
    disabled?: boolean; //deshabilitación del botón
    icon?: any; //icono a mostrar (caso bicis)
    borderColor?: string; //color del borde
    onPress?: Function; //funcion de clicar sobre el boton
    styleBox?: any; //estilo del boton
    transportMode?: number;
  }

export default function LineCodeSemiCircle(props: LineCodeSemiCircleProps) {
  const theme = useTheme();

  return (
    <View style={[styles(theme).container, props.styleBox, 
                {backgroundColor: props.disabled
                    ? theme.colors.gray_400
                    : (props?.transportMode === 7 || props?.transportMode === 10)
                    ? theme.colors.white
                    : props.backgroundColor,
                    borderColor: props.disabled
                    ? theme.colors.gray_400
                    : (props?.transportMode === 7 || props?.transportMode === 10)
                    ? props.backgroundColor
                    : props.backgroundColor !== '#FFFFFF' ? props.borderColor : '#000000',  
                    borderWidth: !props.disabled && !props.borderColor && 
                            (props?.transportMode !== 7 && props?.transportMode !== 10) 
                                ? props.backgroundColor !== '#FFFFFF' 
                                    ? 0 
                                    : 1 
                                : 1, 
                }]}>
        {props.code ? (<Label style={[styles(theme).text,
             { color: (props?.transportMode === 7 || props?.transportMode === 10) && !props.disabled ? props.backgroundColor : props.textColor ?? theme.colors.white },]}>
                {props.code}
                </Label>) 
            : null}
        {props.icon ? (<Icon source={props.icon} tint={!props.disabled ? props.backgroundColor : theme.colors.white} style={{width: 10, height: 10, /* alignSelf: 'flex-end', */ marginLeft: 2}}/>) : null}
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minWidth: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    text: {
        color: theme.colors.white,
        fontSize: 18,
        lineHeight: 27,
        fontWeight: '500',
    },
})
