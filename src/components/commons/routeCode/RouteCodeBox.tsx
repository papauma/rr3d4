import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Label from '../text/Label';
import Icon from '../icon/Icon';
import { LineCodeSemiCircleProps } from './LineCodeSemiCircle';

export default function RouteCodeBox(props: LineCodeSemiCircleProps) {
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
        {props.icon ? (<Icon source={props.icon} tint={props.textColor ?? theme.colors.white} style={{width: 16, height: 16, marginLeft: 2}}/>) : null}
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        borderRadius: 8,
        minWidth: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 6,
    },
    text: {
        color: theme.colors.white,
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
    },
})