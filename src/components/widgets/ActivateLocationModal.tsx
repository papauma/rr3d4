import React from 'react'
import CenteredModal from '../commons/modal/CenteredModal'
import { useTranslate } from '@src/context/languageContext';

interface ActivateLocationModalProps {
    visible: boolean;
    setVisible?: Function;
}

export default function ActivateLocationModal(props: ActivateLocationModalProps) {
  const t = useTranslate();

  return (
    <CenteredModal 
        visible={props.visible} 
        setViewModal={() => {props.setVisible?.(false)}}
        button1={t('button_accept')}
        button2={t('button_cancel')}
        onPressButton2={() => {props.setVisible?.(false)}}
        title={t('location_activate_title')}
        description={t('location_activate_description')}
        modalViewStyle={{borderRadius: 16}}
        showCloseButton={true}
        />
  )
}
