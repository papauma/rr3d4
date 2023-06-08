import React, {useEffect, useState} from 'react';
import InputBar, {InputBarProps} from './InputBar';
import {useTheme} from '@src/context/themeContext';
import Label from '../text/Label';

export interface InputFormProps extends InputBarProps {
  onError?: string;
  onSucess?: string;
}

export default function InputForm(props: InputFormProps) {
  const theme = useTheme();
  const [status, setStatus] = useState(0);

  useEffect(() => {
    if (props.onError) {
      setStatus(2);
    } else if (props.onSucess) {
      setStatus(1);
    } else {
      setStatus(0);
    }
  }, [props.onError, props.onSucess]);

  function styleBarByStatus() {
    if (status === 1) {
      return {borderWidth: 1, borderColor: theme.colors.success_03};
    } else if (status === 2) {
      return {borderWidth: 1, borderColor: theme.colors.error_03};
    } else {
      return undefined;
    }
  }

  return (
    <>
      <InputBar {...props} styleBar={[props.styleBar, styleBarByStatus()]} />
      {props.onSucess && status === 1 ? (
        <Label
          style={{
            color: theme.colors.success_03,
            fontSize: 12,
            marginTop: 4,
            fontWeight: '400',
            lineHeight: 18,
          }}>
          {props.onSucess}
        </Label>
      ) : undefined}
      {props.onError && status === 2 ? (
        <Label
          style={{
            color: theme.colors.error_03,
            fontSize: 12,
            marginTop: 4,
            fontWeight: '400',
            lineHeight: 18,
          }}>
          {props.onError}
        </Label>
      ) : undefined}
    </>
  );
}
