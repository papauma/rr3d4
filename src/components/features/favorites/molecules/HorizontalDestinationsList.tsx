import Button from '@src/components/commons/buttons/Button';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {favoritesInformation} from '@src/redux/slices/favoritesSlice';
import React from 'react';
import {ScrollView} from 'react-native';
import {useSelector} from 'react-redux';

interface HorizontalDestinationsListProps {

}

export default function HorizontalDestinationsList(props: HorizontalDestinationsListProps) {
  const theme = useTheme();
  const t = useTranslate();
  const favoritesDestinations = useSelector(favoritesInformation).destinations;
  let isFavHome = favoritesDestinations.find(
    (element: any) => element.categoryId === 1,
  );
  let isFavWorkplace = favoritesDestinations.find(
    (element: any) => element.categoryId === 2,
  );

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{flexDirection: 'row', alignItems: 'center'}}>
      {!isFavHome && (
        <Button
          buttonCategory="secondary"
          buttonSizeStyle='extra-small'
          title={t('favorites_add_home')}
          icon={theme.drawables.general.Ic_Home}
        />
      )}
      {!isFavWorkplace && (
        <Button
          buttonCategory="secondary"
          title={t('favorites_add_workplace')}
          buttonSizeStyle='extra-small'
          icon={theme.drawables.general.Ic_Work}
          style={{marginLeft: 8}}
        />
      )}
      {favoritesDestinations.map((element: any) => {
        return (<Button
          buttonCategory='tertiary'
          buttonSizeStyle='extra-small'
          title={element?.name}
          style={{marginLeft: 8}}
        />)
      })}
    </ScrollView>
  );
}
