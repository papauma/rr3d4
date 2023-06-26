import { useNavigation } from '@react-navigation/native';
import Button from '@src/components/commons/buttons/Button';
import InfoItemSection from '@src/components/commons/infoComponent/InfoItemSectionProps';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import PersonalInformationDetail from '@src/components/features/account/molecules/PersonalInformationDetail';
import ChangePassword from '@src/components/features/account/organisms/ChangePassword';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { userState } from '@src/redux/slices/userSlice';
import { navigationPages } from '@src/utils/constants';
import React, { useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native'
import { useSelector } from 'react-redux';

export default function AccountManagementScreen() {
    const theme = useTheme();
    const t = useTranslate();
    const navigation = useNavigation();
    const account = useSelector(userState);
    const [alias, setAlias] = useState(account.alias);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
        <ScreenTitle
            title={t('settings_section_general_account')}
        />
        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <ScrollView>
            <View style={{flex: 1, padding: 16, paddingTop: 0, borderRadius: 16,}}>
              <PersonalInformationDetail alias={alias ?? ''} setAlias={setAlias}/>
              <ChangePassword
                oldPassword={oldPassword}
                setOldPassword={setOldPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
              />
            </View>
          </ScrollView>
          <View style={{padding: 16}}>
            <Button
              title={t('button_save_changes')}
              style={{marginBottom: 16}}
              disabled={
                oldPassword.length === 0 ||
                newPassword.length === 0 ||
                confirmPassword.length === 0 ||
                newPassword !== confirmPassword ||
                alias?.length === 0
              }
            />
            <Button
              title={t('account_management_log_out')}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}
