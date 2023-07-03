import InputBar from '@src/components/commons/input/InputBar';
import ScreenTitle from '@src/components/commons/text/ScreenTitle'
import SearchStopsAndLines from '@src/components/features/search/molecules/SearchStopsAndLines';
import SearchContent from '@src/components/features/search/organisms/SearchContent';
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext';
import useSearch from '@src/redux/hooks/search/useSearch';
import { searchSlice } from '@src/redux/slices/searchSlice';
import { IMarker } from '@src/types/interfaces';
import { useDebounce } from '@src/utils/PromiseUtils';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { useDispatch } from 'react-redux';

interface SearchScreenProps {
  showSelectLocation?: boolean;
  showSelectMyLocation?: boolean;
  disableShowStops?: boolean;
  disabledShowDirections?: boolean;
  disableShowPois?: boolean;
  previousScreenParams?: any;
}

export default function SearchScreen(props: SearchScreenProps) {
  const t = useTranslate();
  const theme = useTheme();
  const [text, setText] = useState('');
  const debouncedSearch = useDebounce(text, 500);
  const dispatch = useDispatch();
  const {search, onSearchPressInScreen} = useSearch();
  
  //al iniciar reiniciar las busquedas
  useEffect(() => {
    dispatch(searchSlice.actions.resetAll());
  }, []);

  useEffect(() => {
    async function searchInApi() {
      dispatch(searchSlice.actions.resetAll());
      await search(debouncedSearch);
    }
    if (text.length > 2) {
      searchInApi();
    }
  }, [debouncedSearch]);  

  function onPressResult(result: IMarker) {
    onSearchPressInScreen(props.previousScreenParams?.screen ?? '', result, props.previousScreenParams);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <ScreenTitle
            title={t('search_screen_title')}
            styleContainer={{justifyContent: 'flex-start'}}
        />
        <View style={{flex: 1, }}>
            <InputBar
                value={text}
                onChangeText={setText}
                styleBar={{marginHorizontal: 16}}
                placeholder={t('search_bar_placeholder')}
                clearSearch={() => dispatch(searchSlice.actions.resetAll())}
                actionIcon={text !== ''} 
                showLens={text === ''}
            /> 
            <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
                {text || text !== '' 
                    ? (<>
                        {props.disableShowStops ? null : <SearchStopsAndLines previousScreen={props.previousScreenParams?.screen} onPressResult={onPressResult} />}
                      </>)
                    : (<SearchContent previousScreen={props.previousScreenParams?.screen} onPressResult={onPressResult}/>)
                }
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}
