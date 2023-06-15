import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React from 'react';
import {View, FlatList} from 'react-native';
import DestinationCardFavorite from '../atoms/DestinationCardFavorite';
import {TypeMarker} from '@src/types/ExploreInterfaces';
import FavoritesListEmpty from '../atoms/FavoritesListEmpty';
import Label from '@src/components/commons/text/Label';

interface FavoritesDestinationsProps {
  destinations: Array<any>;
}

export default function FavoritesDestinations(
  props: FavoritesDestinationsProps,
) {
  const theme = useTheme();
  const t = useTranslate();

  function renderCard({item, index}: {item: any; index: number}) {
    return (
      <DestinationCardFavorite
        key={index}
        marker={{
          id: 2,
          markerType: TypeMarker.Direction,
          data: {
            name: 'El corte inglés',
          },
        }}
        staticIcon={theme.drawables.general.Ic_Home}
        style={{marginBottom: 8}}
      />
    );
  }

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
      <FlatList
        data={props.destinations}
        renderItem={renderCard}
        ListHeaderComponent={() => {
          return props.destinations.length === 0 ? null : (
            <Label
              style={{
                color: theme.colors.gray_700,
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: '700',
                lineHeight: 20.8,
                marginVertical: 24,
              }}>
              {t('favorites_destinations_title')}
            </Label>
          );
        }}
        ListEmptyComponent={() => (
          <FavoritesListEmpty
            style={{marginTop: 80}}
            title={t('favorites_empty_title_destinations')}
            description={t('favorites_empty_description_destinations')}
          />
        )}
      />
    </View>
  );
}
