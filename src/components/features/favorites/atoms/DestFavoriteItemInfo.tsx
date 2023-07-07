import Icon from '@src/components/commons/icon/Icon';
import Label from '@src/components/commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface DestFavoriteItemInfoProps {
  name?: string;
  address?: string;
}

export default function DestFavoriteItemInfo(props: DestFavoriteItemInfoProps) {
  const theme = useTheme();

  return (
    <View style={styles(theme).container}>
        <Icon
            source={theme.drawables.general.Ic_Location_blue}
            tint={theme.colors.primary_300}
            style={{marginRight: 8/* , width: 20, height: 20 */}}
        />
        <View>
            {props.name ? <Label style={styles(theme).name}>{props.name}</Label> : null}
            {props.address ? <Label style={styles(theme).address}>{props.address}</Label> : null}
        </View>
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        padding: 16,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
    },
    name: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 20.8,
    },
    address: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 21,
        marginTop: 2,
    }
})
