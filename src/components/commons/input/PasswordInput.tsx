import React, {useState} from 'react';
import {useTheme} from '@src/context/themeContext';
import {useTranslate} from '@src/context/languageContext';
import InputForm, { InputFormProps } from './InputForm';

interface PasswordInputProps extends InputFormProps {
  showLeftIcon?: boolean;
}

export default function PasswordInput(props: PasswordInputProps) {
  const theme = useTheme();
  const t = useTranslate();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <InputForm
      showLens={props.value ? true : false}
      leftIcon={props.showLeftIcon ? theme.drawables.general.Ic_Lock : undefined}
      secureTextEntry={!showPassword}
      //actionIcon={props.value ? true : false}
      onPressLens={() => setShowPassword(!showPassword)}
      lensIcon={
        !showPassword
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
