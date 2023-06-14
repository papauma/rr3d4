import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext'
import React from 'react'
import { View, FlatList } from 'react-native'
import DestinationCardFavorite from '../atoms/DestinationCardFavorite';
import { TypeMarker } from '@src/types/ExploreInterfaces';

interface FavoritesDestinationsProps {
    destinations: Array<any>;
}

export default function FavoritesDestinations(props: FavoritesDestinationsProps) {
  const theme = useTheme();
  const t = useTranslate();

  function renderCard({item, index}: {item: any; index: number}) {
    
    return (<DestinationCardFavorite
        key={index}
        marker={{
            id: 2,
            markerType: TypeMarker.Direction,
            data: {
                name: 'El corte inglés alargado como una mie',
            }
        }}
        staticIcon={theme.drawables.general.Ic_Home}  
        style={{marginBottom: 8}}
    />)
  }

  return (
    <View style={{flex: 1, paddingHorizontal: 16}}>
        <FlatList
            data={[1, 2, 3, 4, 5]}
            renderItem={renderCard}
        />
    </View>
  )
}
