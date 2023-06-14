import React from 'react'
import { FlatList, View } from 'react-native'
import FavoritesListEmpty from '../atoms/FavoritesListEmpty';
import { useTranslate } from '@src/context/languageContext';

interface FavoritesStopsProps {
    stops: Array<any>;
}

export default function FavoritesStops(props: FavoritesStopsProps) {
  const t = useTranslate()

  function renderCard({item, index}: {item: any; index: number}) {
    
    return null
  }

  return (
    <View style={[{flex: 1}, props.stops.length === 0 ? {justifyContent: 'center', alignContent: 'center'} : null]}>
      <FlatList
        data={props.stops}
        renderItem={renderCard}
        ListEmptyComponent={() => (<FavoritesListEmpty
          style={{paddingHorizontal: 16, marginTop: 80}} 
          title={t('favorites_empty_title_stops')}
          description={t('favorites_empty_description_stops')}
        />)}
      />
    </View>
  )
}
