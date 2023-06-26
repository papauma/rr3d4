import CenteredModal from '@src/components/commons/modal/CenteredModal'
import { useTranslate } from '@src/context/languageContext'
import { IGenericModal } from '@src/types/ComponentInterfaces'
import React from 'react'

export default function ConfirmSignUpModal(props: IGenericModal) {
  const t = useTranslate();

  return (
    <CenteredModal
        visible={props.showModal}
        setViewModal={() => props.setShowModal()}
        button1={t('button_accept')}
        modalViewStyle={{borderRadius: 16}}
        showCloseButton={true}
        description={t('signup_modal_confirm_desc')}
        title={t('signup_modal_confirm_title')}
    />
  )
}
