import React from 'react'
import { Pressable, StyleProp, View, ViewStyle } from 'react-native'
import Label from '../text/Label';
import Icon from '../icon/Icon';
import { useTheme } from '@src/context/themeContext';

interface AccordionButtonProps {
    onPress?: Function;
    collapsed?: boolean;
    accessibilityHint?: string;
    title?: string;
    style?: StyleProp<ViewStyle>;
}

export default function AccordionButton(props: AccordionButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
              /* accessibilityHint='Muestra una lista de tipos de momentos en el tiempo para planificar' */
              accessibilityHint={props.accessibilityHint}
              onPress={() => props.onPress?.(!props.collapsed)}
              accessibilityState={{expanded: props.collapsed}}
              style={ [{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                borderRadius: 16,
                backgroundColor: theme.colors.white,
                flexShrink: 1,
                flexGrow: 1,
              }, props.style]}
            >
              {props.title ? <Label /* style={{flexGrow: 1}} */>
                {props.title}
              </Label> : <View/>}
              <Icon
                source={props.collapsed ? theme.drawables.general.Ic_Chevron_Up : theme.drawables.general.Ic_Chevron_Down}
                size={16}
                //onPress={() => setShowTimeMenu(!showTimeMenu)}
              />
            </Pressable>
  )
}
