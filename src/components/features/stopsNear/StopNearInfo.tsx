import Button from '@src/components/commons/buttons/Button';
import Label from '@src/components/commons/text/Label';
import IconBox from '@src/components/widgets/IconBox'
import { ThemeProps, useTheme } from '@src/context/themeContext'
import { ITransportMode } from '@src/types/interfaces';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import NextLineDepartures from '../stopDetails/molecules/NextLineDepartures';

interface StopNearInfoProps {
    stopCode?: string;
    transportMode?: ITransportMode;
    name?: string;
    lineTimes?: Array<any>;
    allLines: Array<number>;
}

export default function StopNearInfo(props: StopNearInfoProps) {
  const theme = useTheme()

  return (
    <>
    <View style={styles(theme).container}>
        <View style={styles(theme).row}>
            <IconBox
                code={props.stopCode}
                alt={props.transportMode?.label}
                iconId={props.transportMode?.iconId}
            />
            {props.name ? <Label style={[styles(theme).name]}>{props.name}</Label> : <View/>}
        </View>
        <Button
            icon={theme.drawables.general.Ic_Plan}
            style={{flexShrink: 1}}
        />
    </View>
    {props.lineTimes && props.lineTimes?.length > 0 && <NextLineDepartures
        allLineTimes={props.lineTimes}
        selectedLines={props.allLines}
    />}
    
    </>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        //backgroundColor: theme.colors.gray_200,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flex: 1,
        padding: 16,
        paddingBottom: 12,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
        display: 'flex',
        //flexGrow: 0,
        flexShrink: 2,
        //display: 'flex',
        //flexGrow: 0,
    },
    name: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 23.4,
        flexShrink: 1,
        flexGrow: 1,
        color: theme.colors.gray_700,
        marginLeft: 8,
        textTransform: 'capitalize',
    },
})
