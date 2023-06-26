import CenteredModal from '@src/components/commons/modal/CenteredModal'
import { useTranslate } from '@src/context/languageContext'
import { IGenericModal } from '@src/types/ComponentInterfaces'
import React from 'react'

export default function ConfirmChangePassword(props: IGenericModal) {
    const t = useTranslate()

    return (
      <CenteredModal
          visible={props.showModal}
          setViewModal={() => props.setShowModal()}
          button1={t('button_accept')}
          modalViewStyle={{borderRadius: 16}}
          showCloseButton={true}
          description={t('account_change_password_modal_changed_desc')}
          title={t('account_change_password_modal_changed_title')}
      />
    )
}
