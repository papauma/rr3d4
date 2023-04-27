import React, { useState } from 'react'
import { ImageStyle, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Label from '../text/Label'
import { ThemeProps, useTheme } from '@src/context/themeContext';
import Icon from '../icon/Icon';

interface ButtonTextProps {
    title?: string;
    styleContainer?: StyleProp<ViewStyle>;
    staticIcon?: any;
    alt?: string;
    selected?: boolean;
    onPress?: Function;
    disabled?: boolean;
    styleIcon?: StyleProp<ImageStyle>;
}

export default function ButtonText(props: ButtonTextProps) {
  const theme = useTheme();
  const [selected, setSelected] = useState(props.selected)

  return (
    <Pressable style={[styles(theme).buttonContainer, props.styleContainer]}
                onPress={() => {props.onPress?.(); setSelected(!selected)}}
     >
        <View style={[styles(theme).content,
             selected && !props.disabled ? styles(theme).selectedContent : null,
             ]}>
            {/* a futuro cambiar por dynamicIcon */}
            <Icon
                source={props.staticIcon}
                alt={props.alt}
                style={[
                    props.styleIcon, 
                    selected ? styles(theme).selectedIcon : null,
                    props.disabled ? styles(theme).disabledIcon : null]}
            />
        </View>
        <Label style={[
            styles(theme).title, 
            props.disabled ? styles(theme).disabledText : null]}>{
            props.title
        }</Label>
    </Pressable>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    buttonContainer: {
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        marginBottom: 6,
        padding: 8,
        borderRadius: 16,
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 21,
    },
    selectedContent: {
        backgroundColor: theme.colors.primary_300,
    },
    disabledText: {
        color: theme.colors.gray_400,
    },
    disabledIcon: {
        tintColor: theme.colors.gray_400,
    },
    selectedIcon: {
        tintColor: theme.colors.white,
    },
})
