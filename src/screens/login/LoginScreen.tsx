import Button from '@src/components/commons/buttons/Button';
import InputBar from '@src/components/commons/input/InputBar';
import InputForm from '@src/components/commons/input/InputForm';
import PasswordInput from '@src/components/commons/input/PasswordInput';
import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import {SafeAreaView, TouchableOpacity, View} from 'react-native';

export default function LoginScreen() {
  const t = useTranslate();
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenTitle title={t('login')} />
      <View style={{flex: 1, padding: 16}}>
        <View style={{flex: 1}}>
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
          <TouchableOpacity style={{marginTop: 12}}>
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
            <TouchableOpacity>
              <Label>{t('login_message_create')}</Label>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
