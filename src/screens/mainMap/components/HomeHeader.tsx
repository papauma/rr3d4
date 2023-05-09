import Button from '@src/components/commons/buttons/Button'
import LocationButton from '@src/components/widgets/LocationButton'
import SearchBarButton from '@src/components/widgets/SearchBarButton'
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext'
import { mapStateMarkerSelected, updateMarkerSelected } from '@src/redux/slices/mapSlice'
import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

interface HomeHeaderProps {
    onPressLocation: Function;
}

export default function HomeHeader(props: HomeHeaderProps) {
  const t = useTranslate();
  const theme = useTheme();
  const markerSelected = useSelector(mapStateMarkerSelected);
  const dispatch = useDispatch()

  return (
    <View style={[styles.searchBarTop]}>
        <SafeAreaView>
            <SearchBarButton iconSearch={markerSelected ? false : true} 
                title={ markerSelected ? markerSelected?.data?.name : t('topSearchBar_title')}
                showBackButton={markerSelected ? true : false}
                backButtonPress={() => dispatch(updateMarkerSelected(undefined))}
                />
            {!markerSelected && (<View style={styles.containerButtons}>
                <LocationButton onPress={props.onPressLocation}/>
                <Button style={{marginTop: 10,}}
                        buttonCategory='secondary' 
                        icon={theme.drawables.general.Ic_filters}
                        />
            </View>)}
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
