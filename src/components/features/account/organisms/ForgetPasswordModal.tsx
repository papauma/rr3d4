import InputBar from '@src/components/commons/input/InputBar';
import CenteredModal from '@src/components/commons/modal/CenteredModal';
import { useTranslate } from '@src/context/languageContext'
import { useTheme } from '@src/context/themeContext';
import React, { useState } from 'react'

interface ForgetPasswordModalProps {
    showModal: boolean;
    setSHowModal: Function;
}

export default function ForgetPasswordModal(props: ForgetPasswordModalProps) {
   const t = useTranslate();
   const theme = useTheme();
  const [email, setEmail] = useState('')

  async function sendEmailForget() {
    props.setSHowModal(false)
  }

  return (
    <CenteredModal
        visible={props.showModal}
        setViewModal={() => props.setSHowModal(false)}
        button1={t('button_send')}
        disabledButton1={!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? '')}
        title={t('login_forget_password_modal_title')}
        description={t('login_forget_password_modal_description')}
        modalViewStyle={{borderRadius: 16}}
        showCloseButton={true}
        onPressButton1={sendEmailForget}
    >
        <InputBar
            value={email}
            placeholder={t('email')}
            styleBar={{marginBottom: 24, borderWidth: 1, borderColor: theme.colors.gray_300}}
            maxLength={200}
            autoCapitalize={'none'}
            keyboardType="email-address"
            onChangeText={setEmail}
        />
    </CenteredModal>
  )
}
