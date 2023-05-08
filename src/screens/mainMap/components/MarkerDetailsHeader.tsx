import { ThemeProps, useTheme } from '@src/context/themeContext'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ButtonsMarker from './ButtonsMarker';
import { ILine } from '@src/types/ExploreInterfaces';
import Label from '@src/components/commons/text/Label';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';

interface MarkerDetailsHeaderProps {
    name?: string;
    lines?: Array<ILine>;
    icon?: any;
}

export default function MarkerDetailsHeader(props: MarkerDetailsHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles(theme).container]}>
        <View style={styles(theme).leftContent}>
            <View style={[styles(theme).row]}>
                {props.icon}
                {props.name ? <Label style={[styles(theme).name]}>{props.name}</Label> : <View/>}
            </View>
            {props.lines && props.lines?.length > 0 && (<View style={{flexDirection: 'row', alignItems: 'center',}}><BottomSheetFlatList 
                horizontal={true}
                data={props.lines}
                ItemSeparatorComponent={() => (<View style={{marginLeft: 4}}/>)}
                renderItem={({item: line, index}) => (<LineCodeSemiCircle code={line?.code} 
                    backgroundColor={line?.routeColor ? `#${line.routeColor}` : undefined} 
                    textColor={line?.routeTextColor ? `#${line.routeTextColor}` : undefined}
                    transportMode={line?.transportmode}
                    //styleBox={[index !== 0 ? styles.codeBox : undefined, {marginBottom: 4}]}
                    />)}
                /></View>)} 
        </View>
        <ButtonsMarker/>
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.gray_200,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        //flex: 1,
        padding: 16,
        borderRadius: 16,
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
        //marginLeft: 8,
    },
    leftContent: {
        alignItems: 'flex-start', 
        alignSelf: 'flex-start', 
        flexShrink: 3,
        flex: 1,
    }
})
