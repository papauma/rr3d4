import React, {useState} from 'react';
import InputBar, {InputBarProps} from './InputBar';
import {useTheme} from '@src/context/themeContext';
import {useTranslate} from '@src/context/languageContext';

interface PasswordInputProps extends InputBarProps {}

export default function PasswordInput(props: PasswordInputProps) {
  const theme = useTheme();
  const t = useTranslate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputBar
      showLens={true}
      leftIcon={theme.drawables.general.Ic_Lock}
      secureTextEntry={!showPassword}
      onPressLens={() => setShowPassword(!showPassword)}
      lensIcon={
        showPassword
          ? theme.drawables.general.Ic_open_eye
          : theme.drawables.general.Ic_Eye
      }
      lensAccessibilityHint={
        showPassword
          ? t('accessibility_password_hide')
          : t('accessibility_password_show')
      }
      {...props}
    />
  );
}
