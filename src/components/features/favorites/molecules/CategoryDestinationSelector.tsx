import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import AccordionButton from '@src/components/commons/buttons/AccordionButton';
import Icon from '@src/components/commons/icon/Icon';
import {Menu} from '@src/components/commons/menu/Menu';
import {MenuItem} from '@src/components/commons/menu/MenuItem';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {
  IFavDestCategory,
  useTotalCategoriesDestinations,
} from '@src/redux/hooks/favorites/useDestinationCategories';
import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';

interface CategoryDestinationSelectorProps {
  selectedCategory?: IFavDestCategory;
  setSelectedCategory: Function;
}

export default function CategoryDestinationSelector(
  props: CategoryDestinationSelectorProps,
) {
  const t = useTranslate();
  const theme = useTheme();
  const categoriesDest = useTotalCategoriesDestinations();

  const [showCategories, setShowCategories] = useState(false);

  return (
    <>
      <AccordionButton
        title={props.selectedCategory ? props.selectedCategory.name : t('favorites_dest_select_icon')}
        collapsed={showCategories}
        icon={props.selectedCategory ? props.selectedCategory.icon : theme.drawables.general.Ic_Star}
        iconColor={theme.colors.gray_700}
        styleTitle={{
          color: theme.colors.gray_600,
          fontSize: 14,
          fontWeight: '400',
        }}
        style={showCategories ? {
          borderWidth: 1,
          borderColor: theme.colors.primary_300,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          padding: 12,
          shadowColor: '#99CC33',
        } : {
          borderWidth: 1,
          borderColor: theme.colors.gray_400,
          borderRadius: 16,
          padding: 12,
        }}
        onPress={() => setShowCategories(!showCategories)}
      />
      <Menu
        visible={showCategories}
        anchor={<View />}
        onRequestClose={() => setShowCategories(false)}>
        <View
          style={{
            maxHeight: 150,
            flex: 1,
          }}>
          <BottomSheetScrollView>
            {categoriesDest.map((element: IFavDestCategory) => {
              return (
                <MenuItem
                  key={element.id}
                  icon={element.icon}
                  iconColor={theme.colors.gray_700}
                  onPress={() => {
                    props.setSelectedCategory(element)
                    setShowCategories(false)
                  }}
                  style={{
                    width: Dimensions.get('window').width - 32,
                    paddingVertical: 9.5,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.gray_300,
                  }}>
                  {element.name}
                </MenuItem>
              );
            })}
          </BottomSheetScrollView>
        </View>
      </Menu>
    </>
  );
}
