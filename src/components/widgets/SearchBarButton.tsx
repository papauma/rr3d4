import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { Pressable, StyleProp, StyleSheet, View,ViewStyle } from 'react-native'
import Button from '../commons/buttons/Button';
import Label from '../commons/text/Label';
import Icon from '../commons/icon/Icon';

interface SearchBarButtonProps {
    sizeStyle?: SearchBarSizeStyle;
    contentBarStyle?: StyleProp<ViewStyle>;
    title?: string;
    iconLeft?: any;
    iconRight?: any;
    iconSearch?: boolean;
    onPress?: Function;
}

type SearchBarSizeStyle =
 |'small'
 |'medium'

export default function SearchBarButton(props: SearchBarButtonProps) {
  const theme = useTheme();

  return (
    <View style={[styles(theme).contentBar, 
        props.sizeStyle === 'medium' 
            ? styles(theme).mediumContentBar 
            : styles(theme).smallContentBar,
        props.contentBarStyle]}>
            {/* <Button buttonCategory='secondary' buttonSizeStyle={props.sizeStyle}/> */}
            <Pressable onPress={() => props.onPress?.()} style={[styles(theme).searchBar, 
                props.sizeStyle === 'medium' 
                ? styles(theme).searchBarMedium 
                : styles(theme).searchBarSmall,
            ]}>
                {props.title 
                    ? <Label style={[styles(theme).title]}>{props.title}</Label> 
                    : null}
                {props.iconSearch
                    ? <Icon source={theme.drawables.general.Ic_Search}/>
                    : null
                }
            </Pressable>
            {/* <Button buttonCategory='tertiary'/> */}
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    contentBar: {
        borderRadius: 16,
        padding: 8,
        gap: 8,
        backgroundColor: theme.colors.gray_200,
        shadowColor: 'rgba(0, 0, 0, 0.11)',
        flexDirection: 'row',
    },
    mediumContentBar: {
        paddingHorizontal: 8,
        paddingVertical: 12,
    },
    smallContentBar: {
        padding: 8,
    },
    searchBar: {
        backgroundColor: theme.colors.white,
        borderRadius: 20,
        flexGrow: 1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    searchBarMedium: {
        paddingVertical: 12,
    },
    searchBarSmall: {
        paddingVertical: 8,
    },
    title: {
        color: theme.colors.gray_600,
        fontSize: 14,
        lineHeight: 21,
        fontWeight: '400',
    }
})