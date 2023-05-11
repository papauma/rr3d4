import Label from '@src/components/commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { searchInformation, searchLoading, searchSlice } from '@src/redux/slices/searchSlice';
import { transportModeState } from '@src/redux/slices/transportmodeSlices';
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SearchCard from '../atoms/SearchCard';
import SearchItem from '../atoms/SearchItem';
import { ILine, TypeMarker } from '@src/types/ExploreInterfaces';
import IconBox from '@src/components/widgets/IconBox';
import { useTranslate } from '@src/context/languageContext';
import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle';
import InfoMapUtils from '@src/utils/InfoMapUtils';
import { searchRecentsSlice } from '@src/redux/slices/searchRecentsSlice';
import { ITransportMode } from '@src/types/interfaces';

export default function SearchStopsAndLines(props: any) {
  const searchInfo = useSelector(searchInformation);
  const contextualSearchLoading = useSelector(searchLoading);
  const selectorTransportModes = useSelector(transportModeState);
  const searchedStops = searchInfo.stops;
  const searchedLines = searchInfo.lines;
  let searchedStopAndLines = searchedStops.concat(searchedLines);
  const theme = useTheme();
  const t = useTranslate();
  const dispatch = useDispatch();

  const onPress = (properties: any) => {
    let transformedMarker = InfoMapUtils.parseSearchStopToMarker(properties);

    dispatch(searchRecentsSlice.actions.updateRecentSearch(transformedMarker));
    props?.onPressResult?.(transformedMarker);
    dispatch(searchSlice.actions.resetAll());
  };

  const renderItem = (item: any, index: number) => {
    //TO CHANGE
    //es una parada
    if (item?.stopName) {
      const transportMode = selectorTransportModes?.find((itemTransportMode: ITransportMode) => {
        return item.stopGtfsId?.includes('est_90')
          ? itemTransportMode.id === 90
          : String(itemTransportMode.id) === String(item.stopTransportMode);
      });
  
      return (
        <SearchItem
          key={item.id}
          style={index !== 0 ? {marginTop: 12} : undefined}
          onPress={() => {onPress(item)}}
          name={item?.stopName}
          address={item.stopDesc}
          iconComponent={(<IconBox
            code={item?.stopCode}
            iconId={transportMode?.iconId}
          />)}
        />
      )

    } else {
      let line: ILine = item;

      return (
        <SearchItem
          key={line?.id}
          style={index !== 0 ? {marginTop: 12} : undefined}
          onPress={() => {}}
          name={line?.name}
          iconComponent={(<LineCodeSemiCircle
            code={line?.code}
            backgroundColor={line?.routeColor ? `#${line.routeColor}` : undefined}
            textColor={line?.routeTextColor ? `#${line.routeTextColor}` : undefined}
            transportMode={line?.transportmode}
          />)}
        />
      )
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 12 }} accessible={true} 
        //accessibilityLabel='Listado de paradas y estaciones obtenidas en el buscador.' 
        //accessibilityHint={`Al pulsar dos veces sobre un elemento ${props.prevScreen}`} 
        role='listitem'>
      <Label style={styles(theme).title}>{t('search_stops_lines')}</Label>
      <View style={{flex: 1}}>
        {contextualSearchLoading.stops ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
          {searchedStopAndLines.length > 0 ? (
              <SearchCard style={{flex: 1}} >
                {searchedStopAndLines.map((element: any, index: number) => renderItem(element, index))}
              </SearchCard>
            ) : <Label>{t('search_empty')}</Label>}
          </>
        )}
      </View>
    </View>
  );
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.white,
        borderRadius: 16, 
        paddingVertical: 12, 
        paddingHorizontal: 8,
    },
    title: {
      textTransform: 'uppercase',
      color: theme.colors.gray_700,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 20.8,
      marginBottom: 8,
    },
})
