import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle'
import { FilterItem } from '@src/components/widgets/FilterItem';
import { useTranslate } from '@src/context/languageContext';
import { ThemeProps, useTheme } from '@src/context/themeContext'
import useFiltersSearch from '@src/redux/hooks/filters/useFiltersSearch';
import { updateFiltersTransportModes } from '@src/redux/slices/filtersSlice';
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux';

export default function FiltersScreen() {
  const theme = useTheme();
  const t = useTranslate();
  const [transports, changed, resetFiltersTemp, filtersTransportTemp] = useFiltersSearch();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1}}>
        <ScreenTitle
            title={t('filters_title')}
            buttonText={t('button_undo')}
            showThirdButton={true}
            onPressOptionalButton={() => {
                resetFiltersTemp()
            }}
            onPressBack={() => {
                dispatch(updateFiltersTransportModes(JSON.parse(JSON.stringify(filtersTransportTemp))));
            }}
        />
        <ScrollView contentContainerStyle={styles(theme).content}>
            <View style={styles(theme).section} 
                accessible={true} 
                accessibilityRole='list' 
                accessibilityLabel={t('accessibility_filters_section_list')}>
                <Label style={styles(theme).sectionTitle}>{t('filters_section_transport')}</Label>
                <View style={styles(theme).sectionList} 
                    accessible={true} 
                    accessibilityRole='list' 
                    accessibilityLabel={t('accessibility_filters_transports')}
                    accessibilityHint={t('accessibility_filters_transports_desc')}>
                    {transports && transports?.map((element: any, index: number) => {
                        return (<FilterItem
                            key={`Transport-${element.id}`}
                            id={element.id}
                            text={element.title}
                            source={element.source} 
                            iconId={element.iconId} 
                            onPress={element.onPress} 
                            selected={element.selected}
                            style={{marginLeft: 14}}
                        />)
                    })}
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
   section: {
    backgroundColor: theme.colors.white,
    padding: 16,
    borderRadius: 16,
   },
   content: {
    padding: 16,
    gap: 16,
   },
   sectionTitle: {
    fontSize: 16,
    color: theme.colors.gray_700,
    fontWeight: '700',
    lineHeight: 20.8,
   },
   sectionList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    flex: 1,
    marginTop: 16,
   },
})
