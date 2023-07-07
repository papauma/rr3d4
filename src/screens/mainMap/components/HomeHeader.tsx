import {useNavigation} from '@react-navigation/native';
import Button from '@src/components/commons/buttons/Button';
import Label from '@src/components/commons/text/Label';
import HorizontalDestinationsList from '@src/components/features/favorites/molecules/HorizontalDestinationsList';
import LocationButton from '@src/components/widgets/LocationButton';
import SearchBarButton from '@src/components/widgets/SearchBarButton';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {contextualInformation} from '@src/redux/slices/contextualSlice';
import {filtersState} from '@src/redux/slices/filtersSlice';
import {
  mapStateMarkerSelected,
  updateMarkerSelected,
} from '@src/redux/slices/mapSlice';
import {navigationPages} from '@src/utils/constants';
import React from 'react';
import {Platform} from 'react-native';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

interface HomeHeaderProps {
  onPressLocation: Function;
}

export default function HomeHeader(props: HomeHeaderProps) {
  const t = useTranslate();
  const theme = useTheme();
  const markerSelected = useSelector(mapStateMarkerSelected);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const filtersSelector = useSelector(filtersState);
  const contextualCanLoadNearStops = useSelector(
    contextualInformation,
  ).showNearStops;

  let numberFilters: number | undefined = filtersSelector.transportModes.length
    ? filtersSelector.transportModes.length
    : undefined;

  return (
    <View style={[styles(theme).searchBarTop]}>
      <SafeAreaView>
        {!markerSelected ? (
          <SearchBarButton
            iconSearch={markerSelected ? false : true}
            title={
              markerSelected
                ? markerSelected?.data?.name
                : t('topSearchBar_title')
            }
            showBackButton={markerSelected ? true : false}
            backButtonPress={() => dispatch(updateMarkerSelected(undefined))}
            onPress={() => {
              navigation.navigate(navigationPages.search, {
                previousScreenParams: {screen: 'Main'},
              });
            }}
          />
        ) : (
          <Button
            icon={theme.drawables.general.Ic_Arrow_Left}
            onPress={() => dispatch(updateMarkerSelected(undefined))}
            buttonCategory="secondary"
            style={{width: 48, height: 48, marginTop: 20}}
          />
        )}
        {!markerSelected && !contextualCanLoadNearStops && (
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <HorizontalDestinationsList />
            <Button
              buttonCategory="secondary"
              icon={theme.drawables.general.Ic_Add}
              style={{width: 40, height: 40, marginLeft: 8}}
              onPress={() => navigation.navigate(navigationPages.saveDestinationFavorite)}
            />
          </View>
        )}
        {!markerSelected && !contextualCanLoadNearStops && (
          <View style={styles(theme).containerButtons}>
            <Button
              style={{width: 40, height: 40}}
              buttonCategory="secondary"
              icon={theme.drawables.general.Ic_filters}
              onPress={() => {
                navigation.navigate(navigationPages.filters);
              }}>
              {numberFilters ? (
                <View style={styles(theme).numberUpView}>
                  <Label style={styles(theme).numberUpText}>
                    {numberFilters}
                  </Label>
                </View>
              ) : (
                ''
              )}
            </Button>
            <LocationButton
              style={{marginTop: 10, width: 40, height: 40}}
              onPress={props.onPressLocation}
            />
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    searchBarTop: {
      position: 'absolute',
      top: 0,
      marginTop: Platform.OS === 'ios' ? 24 : 12,
      left: 0,
      zIndex: 100,
      width: '100%',
      paddingHorizontal: 16,
    },
    containerButtons: {
      alignSelf: 'flex-end',
      marginTop: 10,
    },
    numberUpText: {
      color: theme.colors.white,
      fontSize: 10,
      textAlign: 'center',
      lineHeight: 13,
      fontWeight: '700',
    },
    numberUpView: {
      padding: 0,
      position: 'absolute',
      top: -8,
      right: -4,
      backgroundColor: theme.colors.primary_300,
      height: 14,
      width: 14,
      borderRadius: 7,
    },
  });
