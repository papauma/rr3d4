import { ThemeProps, useTheme } from '@src/context/themeContext'
import React, {useRef, useState} from 'react'
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import InputView, { InputViewProps } from './InputView';
import Icon from '../icon/Icon';
import { useTranslate } from '@src/context/languageContext';

interface InputBarProps extends InputViewProps {
    styleBar?: StyleProp<ViewStyle>;
    actionIcon?: boolean;
    showLens?: boolean;
    onBlur?: Function;
    onEndEditing?: Function;
    onFocus?: Function;
    styleIcon?: any;
    sizeType?: InputSizeTypes;
    clearSearch?: Function;
}

type InputSizeTypes =
    | 'small'
    | 'medium'
    | 'big'

export default function InputBar(props: InputBarProps) {
  const theme = useTheme();
  const t = useTranslate();
  const input: any = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const clear = () => {
    input?.current?.clear();
    props.onChangeText?.('');
    props.clearSearch?.();
  };

  const focus = () => {
    input?.current?.focus();
  };

  function getStyleBySize() {
    if (props.sizeType === 'medium') {
        return styles(theme).mediumBar;
    } else if (props.sizeType === 'big') {
        return styles(theme).bigBar;
    } else {
        return null;
    }
  }

  return (
    <View style={[styles(theme).container, getStyleBySize(), props.styleBar,
        isFocused ? { borderColor: theme.colors.primary_300, borderWidth: 1 } : null,]}>
        <InputView
            {...props}
            multiline={false}
            ref={input}
            inputStyle={{ flex: 1}}
            onBlur={() => {
            props.onBlur?.();
            setIsFocused(false);
            }}
            onEndEditing={() => {
            props.onEndEditing?.();
            setIsFocused(false);
            }}
            onFocus={() => {
            props.onFocus?.();
            setIsFocused(true);
            }}
        />
        <View style={{marginLeft: 8, flexShrink: 1, flexDirection: 'row'}}>
            {props.actionIcon ? (
            <TouchableOpacity 
                              onPress={clear} 
                              accessible={true} 
                              accessibilityLabel={t('input_button_clear')} 
                              accessibilityHint={t('input_button_clear_description')}>
            <Icon
                alt={t('input_icon_search')}
                source={theme.drawables.general.Ic_Close}
                tint={theme.colors.gray_500}
                style={props.styleIcon}
            />
            </TouchableOpacity>
        ) : null}
        {props.showLens && (
            <Icon
                alt={'Lupa'}
                style={[{ marginRight: 8 }, props.actionIcon ? { marginLeft: 8 } : null]}
                source={theme.drawables.general.Ic_Search}
            />
        )}
        </View>
    </View>
  )
}

const styles = (theme: ThemeProps) => StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: theme.colors.white,
        borderRadius: 16,
        //flex: 1,
        flexGrow: 0,
    },
    mediumBar: {
       paddingVertical: 6, 
    },
    bigBar: {
        paddingVertical: 10, 
    }, 
})
