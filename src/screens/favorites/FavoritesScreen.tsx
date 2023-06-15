import InputBar from '@src/components/commons/input/InputBar';
import TripleTab, {ITabSection} from '@src/components/commons/menu/TripleTab';
import Label from '@src/components/commons/text/Label';
import FavoritesStops from '@src/components/features/favorites/molecules/FavoritesStops';
import FavoritesLines from '@src/components/features/favorites/molecules/FavoritesLines';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {favoritesInformation} from '@src/redux/slices/favoritesSlice';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FavoritesDestinations from '@src/components/features/favorites/molecules/FavoritesDestinations';
import {
  contextualInformation,
  contextualSlice,
} from '@src/redux/slices/contextualSlice';
import SuccessSnackBar from '@src/components/commons/feedback/SuccessSnackBar';
import ErrorSnackBar from '@src/components/commons/feedback/ErrorSnackBar';

export default function FavoritesScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const favorites = useSelector(favoritesInformation);
  const contextualInfo = useSelector(contextualInformation);
  const dispatch = useDispatch();

  const favoritesSections: Array<ITabSection> = [
    {
      title: t('favorites_stops'),
      content: <FavoritesStops stops={favorites.stops} />,
    },
    {
      title: t('favorites_destinations'),
      content: (
        <FavoritesDestinations
          destinations={/* favorites.destinations */ [1, 2, 3, 4, 5, 6, 7, 8]}
        />
      ),
    },
    {
      title: t('favorites_lines'),
      content: (
        <FavoritesLines lines={/* favorites.lines */ [1652, 796, 1405]} />
      ),
    },
  ];

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          padding: 21.5,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Label
          style={{
            fontWeight: '700',
            color: theme.colors.gray_800,
            lineHeight: 23.4,
            fontSize: 18,
          }}>
          {t('favorites')}
        </Label>
      </View>
      <View style={{flex: 1, paddingBottom: 16}}>
        <InputBar
          showLens={true}
          value={searchText}
          onChangeText={setSearchText}
          placeholder={t('favorites_search_bar')}
          styleBar={{marginHorizontal: 16}}
        />
        <TripleTab
          sections={favoritesSections}
          styleContainer={{
            backgroundColor: theme.colors.white,
            marginHorizontal: 16,
          }}
        />
      </View>
      {contextualInfo.sucessMessage && (
        <SuccessSnackBar
          message={contextualInfo.sucessMessage}
          onPress={() =>
            dispatch(contextualSlice.actions.updateSucessMessage(''))
          }
        />
      )}
      {contextualInfo.errorMessage && (
        <ErrorSnackBar
          message={contextualInfo.errorMessage}
          onPress={() =>
            dispatch(contextualSlice.actions.updateErrorMessage(''))
          }
        />
      )}
    </SafeAreaView>
  );
}
