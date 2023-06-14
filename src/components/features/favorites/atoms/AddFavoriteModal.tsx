import CenteredModal from '@src/components/commons/modal/CenteredModal';
import {useTranslate} from '@src/context/languageContext';
import React from 'react';

interface AddFavoriteModalProps {
  title?: string;
  description?: string;
  onClose?: Function;
  onConfirm?: Function;
}

export default function AddFavoriteModal(props: AddFavoriteModalProps) {
  const t = useTranslate();

  return (
    <CenteredModal
      modalViewStyle={{borderRadius: 16}}
      showCloseButton={true}
      setViewModal={() => props.onClose?.(false)}
      onPressButton1={() => props.onClose?.(false)}
      onPressButton2={() => props.onConfirm?.()}
      title={props.title}
      description={props.description}
      button1={t('button_cancel')}
      button2={t('button_accept')}></CenteredModal>
  );
}
