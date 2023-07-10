import CenteredModal from '@src/components/commons/modal/CenteredModal';
import {IGenericModal} from '@src/types/ComponentInterfaces';
import React, {useState} from 'react';
import CategoryDestinationSelector from './CategoryDestinationSelector';
import InputBar from '@src/components/commons/input/InputBar';
import {IFavDestCategory} from '@src/redux/hooks/favorites/useDestinationCategories';
import {useTheme} from '@src/context/themeContext';
import {useTranslate} from '@src/context/languageContext';
import {IMarker} from '@src/types/interfaces';
import {TypeMarker} from '@src/types/ExploreInterfaces';

interface SaveDestinationModalProps extends IGenericModal {
  destination: IMarker;
}

export default function SaveDestinationModal(props: SaveDestinationModalProps) {
  const theme = useTheme();
  const t = useTranslate();
  const [selectedCategory, setSelectedCategory] = useState<
    IFavDestCategory | undefined
  >();

  return (
    <CenteredModal
      visible={props.showModal}
      setViewModal={props.setShowModal}
      title={
        props.destination.markerType === TypeMarker.Stop
          ? t('favorites_dest_stop_modal_add_title')
          : t('favorites_dest_modal_add_title')
      }
      description={
        props.destination.markerType === TypeMarker.Stop
          ? t('favorites_dest_stop_modal_add_desc')
          : t('favorites_dest_modal_add_desc')
      }
      button1={t('button_accept')}
      button2={t('button_cancel')}
      onPressButton2={props.setShowModal}>
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
    </CenteredModal>
  );
}
