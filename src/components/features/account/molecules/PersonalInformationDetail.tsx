import InputBar from '@src/components/commons/input/InputBar';
import Label from '@src/components/commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import { userState } from '@src/redux/slices/userSlice';
import React from 'react';
import {StyleSheet} from 'react-native';
import { useSelector } from 'react-redux';

interface PersonalInformationDetailProps {
    alias: string;
    setAlias: Function;
}

export default function PersonalInformationDetail(props: PersonalInformationDetailProps) {
  const t = useTranslate();
  const theme = useTheme();
  const account = useSelector(userState);

  return (
    <>
      <Label style={styles.title}>
        {t('account_management_personal_information')}
      </Label>
      <Label style={styles.inputName}>{t('alias')}</Label>
      <InputBar
        value={props.alias}
        //leftIcon={theme.drawables.general.Ic_User}
        showLens={true}
        lensIcon={theme.drawables.general.Ic_Pencil}
        placeholder={t('alias')}
        onChangeText={props.setAlias}
      />
      <Label style={[styles.inputName, {color: theme.colors.gray_500}]}>{t('email')}</Label>
      <InputBar
        value={account.email}
        //leftIcon={theme.drawables.general.Ic_Email}
        placeholder={t('email')}
        editable={false}
        styleBar={{backgroundColor: theme.colors.gray_300}}
        inputStyle={{color: theme.colors.gray_500}}
        maxLength={200}
        autoCapitalize={'none'}
        keyboardType="email-address"
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20.8,
  },
  inputName: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 16,
    marginBottom: 4,
  },
});
