import CenteredModal from '@src/components/commons/modal/CenteredModal';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React from 'react';

interface DeleteFavoriteModalProps {
  title?: string;
  onClose?: Function;
  onDelete?: Function;
}

export default function DeleteFavoriteModal(props: DeleteFavoriteModalProps) {
  const t = useTranslate();
  const theme = useTheme();

  return (
    <CenteredModal
      modalViewStyle={{borderRadius: 16}}
      showCloseButton={true}
      setViewModal={() => props.onClose?.(false)}
      onPressButton1={() => props.onClose?.(false)}
      onPressButton2={() => props.onDelete?.()}
      title={props.title}
      button1={t('button_cancel')}
      button2={t('button_delete')}></CenteredModal>
  );
}
