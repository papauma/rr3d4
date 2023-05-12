import Icon from '@src/components/commons/icon/Icon';
import IconDynamic from '@src/components/commons/icon/IconDynamic';
import Label from '@src/components/commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { useLazyGetLinesByStopIdQuery, useLazyGetLinesTimesByStopIdQuery, useLazyGetStopByIdQuery } from '@src/redux/services/stopsService';
import { contextualSlice } from '@src/redux/slices/contextualSlice';
import { lineState } from '@src/redux/slices/linesSlices';
import { transportModeState } from '@src/redux/slices/transportmodeSlices';
import MarkerDetailsHeader from '@src/screens/mainMap/components/MarkerDetailsHeader';
import { ILineTime, ILine, SearchStopType } from '@src/types/ExploreInterfaces';
import { IMarker, ITransportMode } from '@src/types/interfaces'
import React, {useEffect, useState} from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import NextLineDepartures from '../molecules/NextLineDepartures';

export default function StopDetails({stop, onPlan} : {stop: IMarker, onPlan: Function}) {
    const [stopInfo, setStopInfo] = useState<SearchStopType | undefined>();
    const [lines, setLines] = useState<Array<ILine>>([]);
    const [linesTimes, setLinesTimes] = useState<Array<ILineTime>>([]);
    const allLines = useSelector(lineState);
    const transportModes = useSelector(transportModeState)

    const [GetStopById] = useLazyGetStopByIdQuery();
    const [GetLinesByStopId] = useLazyGetLinesByStopIdQuery();
    const [GetLinesTimes] = useLazyGetLinesTimesByStopIdQuery();
    const dispatch = useDispatch();
    const theme = useTheme()

  useEffect(() => {
    async function getStopInfoFromAPI() {
        dispatch(contextualSlice.actions.updateShowLoading(true));
        await GetStopById(stop.id)
        .then((stopResult) => {
            setStopInfo(stopResult?.data);
        })
        .catch((e) => {});
        await GetLinesByStopId(stop.id)
        .then(async (linesResult) => {
            let linesOfStop = [...linesResult?.data];
            if (linesOfStop) {
              setLines(linesOfStop.map((lineStop: any) => {
                return allLines.find((element: ILine) => String(element.id) === String(lineStop.id))
              }));
            }
            await GetLinesTimes(stop.id)
            .then((linesTimesResult) => {
                setLinesTimes(linesTimesResult.data);
            })
            .catch((e) => {
                console.log('Error getDataOfStopFromApi times ', e);
                //setErrorLoading(true);
            });
        })
        .catch((e) => {
            console.log('Error getDataOfStopFromApi lines ', e);
            //setErrorLoading(true);
        });
        dispatch(contextualSlice.actions.updateShowLoading(false));
    }

    if (stop) {
        getStopInfoFromAPI()
    }
  }, [stop, allLines])  

  console.log('Líneas que pasan', lines?.length);
  
  function renderIconCodeStop(transportMode?: number, code?: string) {
    let transportModeInfo: ITransportMode | undefined = transportModes.find((element: ITransportMode) => String(element.id) === String(transportMode));

    return (<View style={styles(theme).containerIcon}>
        <IconDynamic iconId={transportModeInfo?.iconId} color={theme.colors.white}/>
        {code ? <Label style={styles(theme).codeName}>{code}</Label> : null}
    </View>)
  }

  return (
    <View style={{flex: 1}}>
        <MarkerDetailsHeader
            name={stopInfo ? stopInfo?.stopName : stop.data?.name}
            lines={lines}
            icon={stopInfo 
                ? renderIconCodeStop(stopInfo.stopTransportMode, stopInfo.stopCode) 
                : renderIconCodeStop(stop.data?.transportMode)
            }
            onPlan={onPlan}
        />
        <View style={styles(theme).rowSpace}>
            <Label style={styles(theme).listTitle}>{'Próximas salidas'}</Label>
            <View style={{flexDirection: 'row', alignItems: 'center',}}>
                <TouchableOpacity>
                    <Icon
                        source={theme.drawables.general.Ic_Real_Time}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 8}}>
                    <Icon
                        source={theme.drawables.general.Ic_Refresh}
                    />
                </TouchableOpacity>
            </View>
        </View>
        <NextLineDepartures 
            lines={lines}
            allLineTimes={linesTimes}
            onPressReset={() => {}}
        />
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    containerIcon: {
        backgroundColor: theme.colors.primary_300,
        padding: 8,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    codeName: {
        color: theme.colors.white,
        fontWeight: '700',
        lineHeight: 18.2,
        fontSize: 14, 
        marginLeft: 4,
    },
    rowSpace: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 24,
    },
    listTitle: {
        color: theme.colors.gray_700,
        fontSize: 16,
        lineHeight: 20.8,
        fontWeight: '700',
        flex: 1,
        textTransform: 'uppercase',
    }
})
