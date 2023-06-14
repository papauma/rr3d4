import { lineState } from '@src/redux/slices/linesSlices';
import { ILine } from '@src/types/ExploreInterfaces';
import React from 'react'
import { FlatList, View } from 'react-native'
import { useSelector } from 'react-redux';
import LineCardFavorite from '../atoms/LineCardFavorite';

interface FavoritesLinesProps {
    lines: Array<any>;
}

export default function FavoritesLines(props: FavoritesLinesProps) {
  const allLines = useSelector(lineState);

  function renderCard({item, index}: {item: number, index: number}) {
    const line: ILine | undefined = allLines.find((element: ILine) => element.id === item)

    if (!line) {
        return undefined
    }

    return (<LineCardFavorite
        key={`${line.id}-${index}`}
        name={line.name}
        transportMode={line.transportmode}
        routeColor={line.routeColor}
        routeTextColor={line.routeTextColor}
        code={line?.code}
        style={{marginTop: 8, marginHorizontal: 16}}
    />)
  }

  return (
    <View style={{flex: 1}}>
        <FlatList
            data={props.lines}
            renderItem={renderCard}
        />
    </View>
  )
}