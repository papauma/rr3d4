import {lineState} from '@src/redux/slices/linesSlices';
import {ILine} from '@src/types/ExploreInterfaces';
import React from 'react';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import LineCardFavorite from '../atoms/LineCardFavorite';
import FavoritesListEmpty from '../atoms/FavoritesListEmpty';
import {useTranslate} from '@src/context/languageContext';
import Label from '@src/components/commons/text/Label';
import {useTheme} from '@src/context/themeContext';

interface FavoritesLinesProps {
  lines: Array<any>;
}

export default function FavoritesLines(props: FavoritesLinesProps) {
  const allLines = useSelector(lineState);
  const t = useTranslate();
  const theme = useTheme();

  function renderCard({item, index}: {item: number; index: number}) {
    const line: ILine | undefined = allLines.find(
      (element: ILine) => element.id === item,
    );

    if (!line) {
      return null;
    }

    return (
      <LineCardFavorite
        key={`${line.id}-${index}`}
        name={line.name}
        transportMode={line.transportmode}
        routeColor={line.routeColor}
        routeTextColor={line.routeTextColor}
        code={line?.code}
        style={{marginTop: 8, marginHorizontal: 16}}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={props.lines}
        renderItem={renderCard}
        ListHeaderComponent={() => {
          return props.lines.length === 0 ? null : (
            <Label
              style={{
                color: theme.colors.gray_700,
                textTransform: 'uppercase',
                fontSize: 16,
                fontWeight: '700',
                lineHeight: 20.8,
                marginHorizontal: 16,
                marginVertical: 24,
              }}>
              {t('favorites_lines_title')}
            </Label>
          );
        }}
        ListEmptyComponent={() => (
          <FavoritesListEmpty
            style={{paddingHorizontal: 16, marginTop: 80}}
            title={t('favorites_empty_title_lines')}
            description={t('favorites_empty_description_lines')}
          />
        )}
      />
    </View>
  );
}
