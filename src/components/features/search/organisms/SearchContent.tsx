import React from 'react'
import { View } from 'react-native'
import SearchCategories from '../molecules/SearchCategories'
import RecentSearches from '../molecules/RecentSearches'

export default function SearchContent(props: any) {
  console.log('[SEARCH CONTENT');
  

  return (
    <View style={{flex: 1}}>
        <SearchCategories/>
        <RecentSearches onPressResult={props.onPressResult}/>
    </View>
  )
}
