import { useNavigation } from '@react-navigation/native';
import Button from '@src/components/commons/buttons/Button';
import InputBar from '@src/components/commons/input/InputBar';
import PasswordInput from '@src/components/commons/input/PasswordInput';
import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import {useTranslate} from '@src/context/languageContext';
import {useTheme} from '@src/context/themeContext';
import { userState } from '@src/redux/slices/userSlice';
import { navigationPages } from '@src/utils/constants';
import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export default function SignUpScreen() {
  const t = useTranslate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const account = useSelector(userState);
  const navigation = useNavigation();

  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorTwoPasswords, setErrorTwoPasswords] = useState('');

  async function confirmSignUp() {
    setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: navigationPages.main}],
        });
      }, 3000);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenTitle title={t('signup')} />
      <View style={{flex: 1, padding: 16}}>
        <InputBar
          value={alias}
          leftIcon={theme.drawables.general.Ic_User}
          placeholder={t('alias')}
          onChangeText={setAlias}
        />
        <InputBar
          value={email}
          leftIcon={theme.drawables.general.Ic_Email}
          placeholder={t('email')}
          styleBar={{marginTop: 16}}
          maxLength={200}
          autoCapitalize={'none'}
          keyboardType='email-address'
          onChangeText={setEmail}
        />
        <PasswordInput
          value={password}
          placeholder={t('password')}
          styleBar={{marginTop: 16}}
          onChangeText={setPassword}
        />
        <PasswordInput
          value={secondPassword}
          placeholder={t('confirm_password')}
          styleBar={{marginTop: 16}}
          onChangeText={setSecondPassword}
          onError={errorTwoPasswords}
          onEndEditing={() => {
            if (password !== secondPassword) {
                setErrorTwoPasswords('No coinciden')
            } else {
                setErrorTwoPasswords('')
            }
          }}
        />
        <Button
          title={t('signup')}
          style={{marginTop: 24}}
          disabled={
            alias.length === 0 ||
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email ?? '') ||
            password !== secondPassword
          }
          onPress={confirmSignUp}
        />
      </View>
    </SafeAreaView>
  );
}
