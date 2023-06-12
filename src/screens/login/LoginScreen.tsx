import {useNavigation} from '@react-navigation/native';
import Button from '@src/components/commons/buttons/Button';
import InputBar from '@src/components/commons/input/InputBar';
import InputForm from '@src/components/commons/input/InputForm';
import PasswordInput from '@src/components/commons/input/PasswordInput';
import BackgroundModal from '@src/components/commons/modal/BackgroundModal';
import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import ForgetPasswordModal from '@src/components/features/account/organisms/ForgetPasswordModal';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import {navigationPages} from '@src/utils/constants';
import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';

export default function LoginScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <SafeAreaView style={{flex: 1}}>
      {showPasswordModal && <BackgroundModal />}
      <ScreenTitle title={t('login')} />
      <View style={{flex: 1, padding: 16}}>
        <View style={{flex: 1}}>
          {showPasswordModal && (
            <ForgetPasswordModal
              showModal={showPasswordModal}
              setSHowModal={setShowPasswordModal}
            />
          )}
          <InputForm
            value={email}
            leftIcon={theme.drawables.general.Ic_Email}
            placeholder={t('email')}
            styleBar={{marginTop: 16}}
            maxLength={200}
            autoCapitalize={'none'}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <PasswordInput
            value={password}
            placeholder={t('password')}
            styleBar={{marginTop: 16}}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={{marginTop: 12}}
            onPress={() => setShowPasswordModal(true)}>
            <Label>{t('login_forget_password')}</Label>
          </TouchableOpacity>
        </View>
        <View>
          <Button title={t('button_next')} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 8,
            }}>
            <Label>{t('login_message_without_account')}</Label>
            <TouchableOpacity
              style={{marginLeft: 4}}
              onPress={() => navigation.navigate(navigationPages.signup)}>
              <Label
                style={{
                  color: theme.colors.gray_700,
                  fontWeight: '700',
                  lineHeight: 18.2,
                }}>
                {t('login_message_create')}
              </Label>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
