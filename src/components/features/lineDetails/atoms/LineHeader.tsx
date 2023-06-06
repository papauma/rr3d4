import Button from '@src/components/commons/buttons/Button';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import Label from '@src/components/commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface LineHeaderProps {
  code?: any;
  lineName?: string;
  routeColor?: string;
  routeTextColor?: string;
  transportMode?: number;
}

export default function LineHeader(props: LineHeaderProps) {
  const theme = useTheme();

  return (
    <View style={styles(theme).container}>
        <View style={styles(theme).row}>
            <LineCodeSemiCircle
                code={props.code}
                textColor={props.routeTextColor ? `#${props.routeTextColor}` : undefined}
                backgroundColor={props.routeColor ? `#${props.routeColor}` : undefined}
                transportMode={props.transportMode}
            />
            {props.lineName 
                ? <Label style={styles(theme).title}>{props.lineName}</Label> 
                : null
            }
        </View>
        <Button
          icon={theme.drawables.general.Ic_Star}
          buttonCategory='tertiary'
          style={{flexShrink: 1, marginLeft: 8}}
        />
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 23.4,
        marginLeft: 8,
    }
})
