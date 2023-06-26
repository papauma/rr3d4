import InputForm from '@src/components/commons/input/InputForm';
import PasswordInput from '@src/components/commons/input/PasswordInput';
import CenteredModal from '@src/components/commons/modal/CenteredModal';
import Label from '@src/components/commons/text/Label';
import ForgetPasswordModal from '@src/components/features/account/organisms/ForgetPasswordModal';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import { TouchableOpacity } from 'react-native';

interface LoginModalProps {
  showModal: boolean;
  setShowModal: Function;
}

export default function LoginModal(props: LoginModalProps) {
  const theme = useTheme();
  const t = useTranslate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>
      <CenteredModal
        visible={props.showModal}
        showCloseButton={true}
        modalViewStyle={{borderRadius: 16}}
        setViewModal={() => props.setShowModal(false)}
        button2={t('button_cancel')}
        button1={t('button_accept')}
        onPressButton1={() => props.setShowModal(false)}
        onPressButton2={() => props.setShowModal(false)}
        title={t('login')}>
        <InputForm
          value={email}
          //leftIcon={theme.drawables.general.Ic_Email}
          placeholder={t('email')}
          styleBar={{marginTop: 16, borderWidth: 1, borderColor: theme.colors.gray_400}}
          maxLength={200}
          autoCapitalize={'none'}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <PasswordInput
          value={password}
          placeholder={t('password')}
          styleBar={{marginTop: 16, borderWidth: 1, borderColor: theme.colors.gray_400}}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={{marginTop: 12, marginBottom: 24}}
          onPress={() => setShowPasswordModal(true)}>
          <Label>{t('login_forget_password')}</Label>
        </TouchableOpacity>
      </CenteredModal>
      {showPasswordModal && (
        <ForgetPasswordModal
          showModal={showPasswordModal}
          setSHowModal={setShowPasswordModal}
        />
      )}
    </>
  );
}
