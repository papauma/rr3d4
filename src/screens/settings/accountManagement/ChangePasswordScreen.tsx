import Button from '@src/components/commons/buttons/Button';
import PasswordInput from '@src/components/commons/input/PasswordInput';
import Label from '@src/components/commons/text/Label';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

export default function ChangePasswordScreen() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const t = useTranslate();
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScreenTitle title={t('account_change_password_title')} />
        <ScrollView
          contentContainerStyle={{paddingBottom: 16, paddingHorizontal: 16}}>
          <View>
            {oldPassword && <Label>{t('account_change_password_old')}</Label>}
            <PasswordInput
              value={oldPassword}
              placeholder={t('account_change_password_old')}
              onChangeText={setOldPassword}
            />
          </View>

          <View style={{marginTop: 16}}>
            {newPassword && <Label>{t('account_change_password_new')}</Label>}
            <PasswordInput
              value={newPassword}
              placeholder={t('account_change_password_new')}
              onChangeText={setNewPassword}
            />
          </View>
          <View style={{marginTop: 16}}>
            {confirmPassword && (
              <Label>{t('account_change_password_confirm')}</Label>
            )}
            <PasswordInput
              value={confirmPassword}
              placeholder={t('account_change_password_confirm')}
              onChangeText={setConfirmPassword}
            />
          </View>
        </ScrollView>
      </View>
      <View style={{paddingBottom: 16, paddingHorizontal: 16}}>
        <Button
          title={t('button_save_changes')}
          disabled={
            oldPassword.length === 0 ||
            newPassword.length === 0 ||
            confirmPassword.length === 0 ||
            newPassword !== confirmPassword
          }
        />
      </View>
    </SafeAreaView>
  );
}
