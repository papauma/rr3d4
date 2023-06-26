import PasswordInput from '@src/components/commons/input/PasswordInput';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function ChangePassword({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}: {
  oldPassword: string;
  setOldPassword: Function;
  newPassword: string;
  setNewPassword: Function;
  confirmPassword: string;
  setConfirmPassword: Function;
}) {
  const t = useTranslate();
  const theme = useTheme();

  return (
    <>
      <Label style={styles.title}>{t('account_change_password_title')}</Label>
      <Label style={styles.inputName}>{t('account_change_password_old')}</Label>
      <PasswordInput
        value={oldPassword}
        placeholder={t('account_change_password_old')}
        onChangeText={setOldPassword}
      />

      <Label style={styles.inputName}>{t('account_change_password_new')}</Label>
      <PasswordInput
        value={newPassword}
        placeholder={t('account_change_password_new')}
        onChangeText={setNewPassword}
      />
      <Label style={styles.inputName}>
        {t('account_change_password_confirm')}
      </Label>
      <PasswordInput
        value={confirmPassword}
        placeholder={t('account_change_password_confirm')}
        onChangeText={setConfirmPassword}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20.8,
    marginTop: 24,
  },
  inputName: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 16,
    marginBottom: 4,
  },
});
