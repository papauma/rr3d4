import CheckBox from '@src/components/commons/checkbox/CheckBox';
import InputBar from '@src/components/commons/input/InputBar';
import PasswordInput from '@src/components/commons/input/PasswordInput';
import CenteredModal from '@src/components/commons/modal/CenteredModal';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

interface SignUpModalProps {
  showModal: boolean;
  setShowModal: Function;
}

export default function SignUpModal(props: SignUpModalProps) {
  const theme = useTheme();
  const t = useTranslate();

  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorTwoPasswords, setErrorTwoPasswords] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <>
      <CenteredModal
        visible={props.showModal}
        showCloseButton={true}
        modalViewStyle={{borderRadius: 16}}
        setViewModal={() => props.setShowModal(false)}
        button2={t('button_cancel')}
        button1={t('button_accept')}
        disabledButton1={alias.length === 0 ||
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? '') ||
            password !== secondPassword || !acceptTerms}
        onPressButton1={() => props.setShowModal(false)}
        onPressButton2={() => props.setShowModal(false)}
        title={t('signup')}>
        <InputBar
          value={alias}
          //leftIcon={theme.drawables.general.Ic_User}
          styleBar={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: theme.colors.gray_400,
          }}
          placeholder={t('alias')}
          onChangeText={setAlias}
        />
        <InputBar
          value={email}
          //leftIcon={theme.drawables.general.Ic_Email}
          placeholder={t('email')}
          styleBar={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: theme.colors.gray_400,
          }}
          maxLength={200}
          autoCapitalize={'none'}
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <PasswordInput
          value={password}
          placeholder={t('password')}
          styleBar={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: theme.colors.gray_400,
          }}
          onChangeText={setPassword}
        />
        <PasswordInput
          value={secondPassword}
          placeholder={t('confirm_password')}
          styleBar={{
            marginTop: 16,
            borderWidth: 1,
            borderColor: theme.colors.gray_400,
          }}
          onChangeText={setSecondPassword}
          onError={errorTwoPasswords}
          onEndEditing={() => {
            if (password !== secondPassword) {
              setErrorTwoPasswords('No coinciden');
            } else {
              setErrorTwoPasswords('');
            }
          }}
        />
        <View
          style={{
            marginTop: 16,
            marginBottom: 24,
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 4,
          }}>
          <CheckBox
            selected={acceptTerms}
            onPress={() => setAcceptTerms(!acceptTerms)}
          />
          <TouchableOpacity>
            <Label
              style={{
                marginLeft: 8,
                textDecorationStyle: 'solid',
                textDecorationLine: 'underline',
              }}>
              {t('signup_terms_conditions')}
            </Label>
          </TouchableOpacity>
        </View>
      </CenteredModal>
    </>
  );
}
