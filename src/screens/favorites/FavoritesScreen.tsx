import InputBar from '@src/components/commons/input/InputBar';
import TripleTab, {ITabSection} from '@src/components/commons/menu/TripleTab';
import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import FavoritesStops from '@src/components/features/favorites/molecules/FavoritesStops';
import FavoritesLines from '@src/components/features/favorites/molecules/FavoritesLines';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {favoritesInformation} from '@src/redux/slices/favoritesSlice';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useSelector} from 'react-redux';
import FavoritesDestinations from '@src/components/features/favorites/molecules/FavoritesDestinations';

export default function FavoritesScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const [searchText, setSearchText] = useState('');
  const favorites = useSelector(favoritesInformation);

  const favoritesSections: Array<ITabSection> = [
    {
      title: t('favorites_stops'),
      content: <FavoritesStops stops={favorites.stops} />,
    },
    {
      title: t('favorites_destinations'),
      content: <FavoritesDestinations destinations={favorites.destinations} />,
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
    </SafeAreaView>
  );
}
