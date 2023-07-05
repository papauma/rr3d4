import {BottomSheetScrollView, useBottomSheet} from '@gorhom/bottom-sheet';
import Icon from '@src/components/commons/icon/Icon';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {stopsState} from '@src/redux/slices/stopsSlices';
import {ILine, SearchStopType} from '@src/types/ExploreInterfaces';
import {
  IBounds,
  ILocation,
  IMarker,
  ITransportMode,
} from '@src/types/interfaces';
import GeoUtils from '@src/utils/GeoUtils';
import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {log} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import StopNearInfo from './StopNearInfo';
import {transportModeState} from '@src/redux/slices/transportmodeSlices';
import {
  useLazyGetLinesByStopIdQuery,
  useLazyGetLinesTimesByStopIdQuery,
} from '@src/redux/services/stopsService';
import {contextualSlice} from '@src/redux/slices/contextualSlice';
import {lineState} from '@src/redux/slices/linesSlices';
import {filterBounds} from '@src/utils/utilsMaps';

interface StopsNearCenterProps {
  region: any;
  loadingCenter: boolean;
  center: ILocation;
  canLoadNearStops: boolean;
}

export default function StopsNearCenter(props: StopsNearCenterProps) {
  const theme = useTheme();
  const t = useTranslate();
  const allStops = useSelector(stopsState);
  const transportModes = useSelector(transportModeState);
  const bottomsheet = useBottomSheet();
  const [stopsNear, setStopsNear] = useState<Array<IMarker>>([]);
  const dispatch = useDispatch();
  const allLines = useSelector(lineState);
  const [loadedPage, setLoadedPage] = useState(1);
  const [loadedStopsNear, setLoadedStopsNear] = useState([]);
  //const [GetLinesByStopId] = useLazyGetLinesByStopIdQuery();
  const [GetLinesTimes] = useLazyGetLinesTimesByStopIdQuery();

  console.log('Paradas cercanas');

  useEffect(() => {
    bottomsheet.snapToIndex(1);
  }, []);

  useEffect(() => {
    let calculatedStopsNear: Array<IMarker> = filterBounds(
      allStops,
      props.region,
    );

    //cuando se haya modificado el centro de mapa se filtran las nuevas paradas
    //y se resetea la paginación
    setStopsNear(calculatedStopsNear);
    setLoadedPage(1);
    setLoadedStopsNear([]);
  }, [props.center, allStops]);

  useEffect(() => {
    async function getStopInfoFromAPI() {
      dispatch(contextualSlice.actions.updateShowLoadingBackground(true));
      let stopsNearToWork: Array<IMarker> = [];
      let copyStopsNear: Array<IMarker> = JSON.parse(JSON.stringify(stopsNear));
      console.log('Length total', copyStopsNear.length);

      stopsNearToWork = stopsNearToWork.concat(
        copyStopsNear.slice(
          loadedPage === 1 ? 0 : (loadedPage - 1) * 5 + 1,
          5 * loadedPage,
        ),
      );

      let times = await Promise.all(
        stopsNearToWork.map(async (stop: IMarker) => {
          let resultLineTime = await GetLinesTimes(stop.id);
          if (resultLineTime.data) {
            return resultLineTime.data;
          } else {
            return null;
          }
        }),
      );

      let parsedStopDataLineTimes: Array<IMarker> = times.map(
        (element: any, index: number) => {
          let copyStop = JSON.parse(JSON.stringify(stopsNearToWork[index]));
          copyStop.lineTimes = element;

          return copyStop;
        },
      );

      let copyLoadedStopData = JSON.parse(JSON.stringify(loadedStopsNear));

      copyLoadedStopData = copyLoadedStopData.concat(parsedStopDataLineTimes);

      setLoadedStopsNear(copyLoadedStopData);
      dispatch(contextualSlice.actions.updateShowLoadingBackground(false));
    }

    if (
      stopsNear.length > 0 &&
      !props.loadingCenter &&
      props.canLoadNearStops &&
      Math.ceil(loadedStopsNear.length / 5) < loadedPage
    ) {
      getStopInfoFromAPI();
    }
  }, [
    stopsNear,
    allLines,
    loadedPage,
    dispatch,
    GetLinesTimes,
    props.loadingCenter,
    props.canLoadNearStops,
  ]);

  const handleScroll = event => {
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const screenHeight = Dimensions.get('window').height;

    // Verifica si se ha llegado al final del ScrollView
    const isEndReached =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - screenHeight;

    if (isEndReached) {
      console.log('Se ha alcanzado el final del ScrollView');
      if (stopsNear.length > 0 && loadedPage < stopsNear.length / 5) {
        console.log('Se añade nueva página');

        setLoadedPage(loadedPage + 1);
      }
    }
  };

  return (
    <View style={styles(theme).content}>
      <View style={styles(theme).header} accessible={true}>
        <Icon source={theme.drawables.general.Ic_Refresh} />
        <Label style={styles(theme).title}>
          {props.loadingCenter
            ? t('stops_near_change_center')
            : t('stops_near_title')}
        </Label>
      </View>
      {!props.loadingCenter && (
        <View style={styles(theme).list}>
          <BottomSheetScrollView
            onScroll={handleScroll}
            accessible={true}
            accessibilityRole={'list'}
            accessibilityLabel={'accessibility_near_stops'}>
            {loadedStopsNear?.length > 0 ? (
              loadedStopsNear.map((stop: IMarker) => {
                return (
                  <StopNearInfo
                    key={stop.id}
                    stopId={stop.id}
                    marker={stop}
                    name={stop.data?.name}
                    stopCode={stop?.data?.code}
                    lineTimes={stop?.lineTimes}
                    allLines={allLines.map((line: ILine) => line.id)}
                    transportMode={transportModes.find(
                      (element: ITransportMode) =>
                        String(element.id) === String(stop.data?.transportMode),
                    )}
                  />
                );
              })
            ) : (
              <Label style={styles(theme).empty}>{t('stops_near_empty')}</Label>
            )}
          </BottomSheetScrollView>
        </View>
      )}
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    title: {
      marginLeft: 8,
      color: theme.colors.gray_700,
      fontWeight: '700',
      fontSize: 18,
      lineHeight: 23.4,
    },
    content: {
      flex: 1,
    },
    list: {
      flex: 1,
      backgroundColor: theme.colors.gray_200,
    },
    header: {
      backgroundColor: theme.colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 8,
      marginBottom: 24,
      paddingHorizontal: 16,
    },
    empty: {
      fontSize: 14,
      fontWeight: '600',
      padding: 16,
    },
  });
