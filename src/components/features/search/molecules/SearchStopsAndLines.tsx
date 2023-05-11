import Label from '@src/components/commons/text/Label';
import { ThemeProps, useTheme } from '@src/context/themeContext';
import { searchInformation, searchLoading } from '@src/redux/slices/searchSlice';
import { stopsState } from '@src/redux/slices/stopsSlices';
import { transportModeState } from '@src/redux/slices/transportmodeSlices';
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import SearchCard from '../atoms/SearchCard';
import SearchItem from '../atoms/SearchItem';
import { TypeMarker } from '@src/types/ExploreInterfaces';
import IconBox from '@src/components/widgets/IconBox';
import { useTranslate } from '@src/context/languageContext';

export default function SearchStopsAndLines() {
  const searchInfo = useSelector(searchInformation);
  const contextualSearchLoading = useSelector(searchLoading);
  const selectorTransportModes = useSelector(transportModeState);
  const selectorStops = useSelector(stopsState);
  const searchedStops = searchInfo.stops;
  const theme = useTheme();
  const t = useTranslate();


  const renderItem = (item, index) => {
    const transportMode = selectorTransportModes?.find((itemTransportMode) => {
      return item.stopGtfsId?.includes('est_90')
        ? itemTransportMode.id === 90
        : String(itemTransportMode.id) === String(item.stopTransportMode);
    });
    const stopName = item.stopName

    return (
      <SearchItem
        key={item.id}
        //alt={`Icono modo de transporte ${transportMode.label}`}
        //typeMarker={TypeMarker.Stop}
        style={index !== 0 ? {marginTop: 12} : undefined}
        onPress={() => {}}
        name={stopName}
        address={item.stopDesc}
        iconComponent={(<IconBox
          code={item?.stopCode}
          iconId={transportMode?.iconId}
        />)}
        //iconId={transportMode.iconId}
      />
    )
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: 12 }} accessible={true} 
        //accessibilityLabel='Listado de paradas y estaciones obtenidas en el buscador.' 
        //accessibilityHint={`Al pulsar dos veces sobre un elemento ${props.prevScreen}`} 
        role='listitem'>
      <Label style={styles(theme).title}>{t('search_stops_lines')}</Label>
      <View style={{}}>
        {contextualSearchLoading.stops ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
          {searchedStops.length > 0 ? (
              <SearchCard>
                {searchedStops.slice(0, 5).map((element: any, index: number) => renderItem(element, index))}
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
