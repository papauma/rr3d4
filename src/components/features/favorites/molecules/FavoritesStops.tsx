import React from 'react';
import {FlatList, View} from 'react-native';
import FavoritesListEmpty from '../atoms/FavoritesListEmpty';
import {useTranslate} from '@src/context/languageContext';
import Label from '@src/components/commons/text/Label';
import {useTheme} from '@src/context/themeContext';

interface FavoritesStopsProps {
  stops: Array<any>;
}

export default function FavoritesStops(props: FavoritesStopsProps) {
  const t = useTranslate();
  const theme = useTheme();

  function renderCard({item, index}: {item: any; index: number}) {
    return null;
  }

  return (
    <View
      style={[
        {flex: 1},
        props.stops.length === 0
          ? {justifyContent: 'center', alignContent: 'center'}
          : null,
      ]}>
      <FlatList
        data={props.stops}
        renderItem={renderCard}
        ListHeaderComponent={() => {
          return props.stops.length === 0 ? null : (
            <Label
              style={{
                color: theme.colors.gray_700,
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: '700',
                lineHeight: 20.8,
                marginHorizontal: 16,
                marginBottom: 24,
              }}>
              {t('favorites_stops_title')}
            </Label>
          );
        }}
        ListEmptyComponent={() => (
          <FavoritesListEmpty
            style={{paddingHorizontal: 16, marginTop: 80}}
            title={t('favorites_empty_title_stops')}
            description={t('favorites_empty_description_stops')}
          />
        )}
      />
    </View>
  );
}
