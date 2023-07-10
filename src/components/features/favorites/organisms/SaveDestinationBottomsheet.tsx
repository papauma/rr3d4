import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import AccordionButton from '@src/components/commons/buttons/AccordionButton';
import Button from '@src/components/commons/buttons/Button';
import InputBar from '@src/components/commons/input/InputBar';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CategoryDestinationSelector from '../molecules/CategoryDestinationSelector';
import {IFavDestCategory} from '@src/redux/hooks/favorites/useDestinationCategories';
import DestFavoriteItemInfo from '../atoms/DestFavoriteItemInfo';
import {useNavigation} from '@react-navigation/native';
import {navigationPages} from '@src/utils/constants';

interface SaveDestinationBottomsheetProps {}

export default function SaveDestinationBottomsheet(
  props: SaveDestinationBottomsheetProps,
) {
  const theme = useTheme();
  const t = useTranslate();
  const [selectedCategory, setSelectedCategory] = useState<
    IFavDestCategory | undefined
  >();
  const navigation = useNavigation();

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Label style={styles(theme).headerTitle}>{t('favorites_save')}</Label>
        <Button
          buttonCategory="tertiary"
          title={t('button_search')}
          onPress={() =>
            navigation.navigate(navigationPages.search, {
              previousScreenParams: {screen: 'SelectLocation'},
            })
          }
        />
      </View>
      <View style={styles(theme).content}>
        <BottomSheetScrollView>
          <DestFavoriteItemInfo
            name="Calle del ejemplo"
            address="Calle 13, puerta 25"
          />
          <CategoryDestinationSelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <InputBar
            styleBar={{
              borderColor: theme.colors.gray_400,
              borderWidth: 1,
              marginTop: 12,
            }}
            lensIcon={theme.drawables.general.Ic_Pencil}
            showLens={true}
            placeholder={t('favorites_name')}
          />
        </BottomSheetScrollView>
        <Button
          title={t('button_confirm')}
          style={{marginBottom: 14, marginTop: 16}}
        />
      </View>
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.white,
      paddingVertical: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    container: {
      flex: 1,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 23.4,
      color: theme.colors.gray_700,
    },
    content: {
      flex: 1,
      justifyContent: 'space-between',
      backgroundColor: theme.colors.gray_200,
      paddingHorizontal: 16,
      paddingVertical: 10,
    },
  });
