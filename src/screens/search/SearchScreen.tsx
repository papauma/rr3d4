import InputBar from '@src/components/commons/input/InputBar';
import ScreenTitle from '@src/components/commons/text/ScreenTitle'
import SearchStopsAndLines from '@src/components/features/search/molecules/SearchStopsAndLines';
import SearchContent from '@src/components/features/search/organisms/SearchContent';
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext';
import useSearch from '@src/redux/hooks/search/useSearch';
import { searchSlice } from '@src/redux/slices/searchSlice';
import { useDebounce } from '@src/utils/PromiseUtils';
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { useDispatch } from 'react-redux';

export default function SearchScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const [text, setText] = useState('');
  const debouncedSearch = useDebounce(text, 500);
  const dispatch = useDispatch();
  const {search} = useSearch();
  
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
                actionIcon={true} showLens={true}
            /> 
            <ScrollView contentContainerStyle={{paddingHorizontal: 16}}>
                {text || text !== '' 
                    ? (<>
                        <SearchStopsAndLines/>
                      </>)
                    : (<SearchContent/>)
                }
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}
