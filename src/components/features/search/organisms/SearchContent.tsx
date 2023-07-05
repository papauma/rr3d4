import React from 'react';
import {View} from 'react-native';
import SearchCategories from '../molecules/SearchCategories';
import RecentSearches from '../molecules/RecentSearches';

export default function SearchContent(props: any) {

  return (
    <View style={{flex: 1}}>
      {props.previousScreen !== 'Planner' && <SearchCategories />}
      <RecentSearches
        previousScreen={props.previousScreen}
        onPressResult={props.onPressResult}
      />
    </View>
  );
}
