import Button from '@src/components/commons/buttons/Button'
import LocationButton from '@src/components/widgets/LocationButton'
import SearchBarButton from '@src/components/widgets/SearchBarButton'
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext'
import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

export default function HomeHeader() {
  const t = useTranslate();
  const theme = useTheme();

  return (
    <View style={[styles.searchBarTop]}>
        <SafeAreaView>
            <SearchBarButton iconSearch={true} title={t('topSearchBar_title')}/>
            <View style={styles.containerButtons}>
                <LocationButton/>
                <Button style={{marginTop: 10,}}
                        buttonCategory='secondary' 
                        icon={theme.drawables.general.Ic_filters}
                        />
            </View>
        </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
    searchBarTop: {
      position: 'absolute',
      top: 0,
      marginTop: 12,
      left: 0,
      zIndex: 100,
      width: '100%',
      paddingHorizontal: 16,
    },
    containerButtons: {
        alignSelf: 'flex-end',
        marginTop: 10,
    },
})
