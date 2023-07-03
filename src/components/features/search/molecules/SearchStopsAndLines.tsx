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
import { plannerSegmentsSlice } from '@src/redux/slices/plannerSegmentsSlice';
import { useNavigation } from '@react-navigation/native';
import { navigationPages } from '@src/utils/constants';

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
  const navigation = useNavigation()

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
      const transportMode: ITransportMode | undefined = selectorTransportModes?.find((itemTransportMode: ITransportMode) => {
        return item.stopGtfsId?.includes('est_90')
          ? itemTransportMode.id === 90
          : String(itemTransportMode.id) === String(item.stopTransportMode);
      });
  
      return (
        <SearchItem
          key={item.id}
          accessibilityHint={props.previousScreen === 'Planner' ? '' : t('accessibility_search_item_main_desc') }
          style={[
            {paddingHorizontal: 16},
            index !== 0
              ? {borderTopWidth: 1, borderTopColor: theme.colors.gray_300}
              : {},
          ]}
          onPress={() => {onPress(item)}}
          name={item?.stopName}
          address={item.stopDesc}
          onPressPlan={props.previousScreen !== 'Planner' ? () => {
            let transformedMarker = InfoMapUtils.parseSearchStopToMarker(item);

            dispatch(searchRecentsSlice.actions.updateRecentSearch(transformedMarker));
            dispatch(plannerSegmentsSlice.actions.init({ origin: null, destination: transformedMarker }));
            navigation.goBack();
            navigation.navigate(navigationPages.main, {screen: navigationPages.planner});
            dispatch(searchSlice.actions.resetAll());
          } : undefined}
          iconComponent={(<IconBox
            code={item?.stopCode}
            alt={transportMode?.label}
            iconId={transportMode?.iconId}
          />)}
        />
      )

    } else {
      let line: ILine = item;

      return (
        <SearchItem
          key={line?.id}
          style={[
            {paddingHorizontal: 16},
            index !== 0
              ? {borderTopWidth: 1, borderTopColor: theme.colors.gray_300}
              : {},
          ]}
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
        >
      <Label style={styles(theme).title}>{t('search_stops_lines')}</Label>
      <View style={{flex: 1}} 
            accessibilityRole='list' 
            accessible={true} 
            accessibilityLabel={t('accessibility_search_stops_lines')}>
        {contextualSearchLoading.stops ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
          {searchedStopAndLines.length > 0 ? (
              <SearchCard style={{flex: 1, paddingHorizontal: 0}} >
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
