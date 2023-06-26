import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Icon from '../commons/icon/Icon';
import Label from '../commons/text/Label';
import {useTranslate} from '@src/context/languageContext';
import {ThemeProps, useTheme} from '@src/context/themeContext';
import {useNavigation} from '@react-navigation/native';
import {navigationPages} from '@src/utils/constants';
import LoginModal from '@src/screens/login/LoginModal';
import { useDispatch } from 'react-redux';
import { contextualSlice } from '@src/redux/slices/contextualSlice';
import SignUpModal from '@src/screens/signup/SignUpModal';

interface InfoSignUpProps {
  style?: StyleProp<ViewStyle>;
}

export default function InfoSignUp(props: InfoSignUpProps) {
  const t = useTranslate();
  const theme = useTheme();
  const navigation = useNavigation();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const dispatch = useDispatch()

  return (
    <View style={[styles(theme).container, props.style]}>
      <View style={styles(theme).row}>
        <Icon
          source={theme.drawables.general.Ic_Info}
          tint={theme.colors.primary_300}
        />
        <Label style={styles(theme).description}>{t('menu_login')}</Label>
      </View>
      <View
        style={[
          styles(theme).row,
          {marginTop: 17, justifyContent: 'flex-end'},
        ]}>
        <TouchableOpacity
          style={{flexShrink: 1}}
          onPress={() => {
            //navigation.navigate(navigationPages.login)
            dispatch(contextualSlice.actions.updateShowBackground(true))
            setShowLoginModal(true)
          }}>
          <Label style={styles(theme).button}>{t('login')}</Label>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexShrink: 1, marginLeft: 16}}
          onPress={() => {
            //navigation.navigate(navigationPages.signup)
            dispatch(contextualSlice.actions.updateShowBackground(true))
            setShowSignUpModal(true)
          }}>
          <Label style={styles(theme).button}>{t('signup')}</Label>
        </TouchableOpacity>
      </View>
      {showLoginModal && <LoginModal
        showModal={showLoginModal}
        setShowModal={() => {
          setShowLoginModal(false)
          dispatch(contextualSlice.actions.updateShowBackground(false))
        }}
      />}
      {showSignUpModal && <SignUpModal
        showModal={showSignUpModal}
        setShowModal={() => {
          setShowSignUpModal(false)
          dispatch(contextualSlice.actions.updateShowBackground(false))
        }}
      />}
    </View>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      borderRadius: 16,
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    description: {
      color: theme.colors.gray_700,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 18.2,
      marginLeft: 8,
      flex: 1,
    },
    button: {
      color: theme.colors.primary_500,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 21,
      textAlign: 'right',
    },
  });
