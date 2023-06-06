import React from 'react';
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { useTheme } from '@src/context/themeContext';
import { useTranslate } from '@src/context/languageContext';
import AccordionButton from '../buttons/AccordionButton';

export interface SelectionBoxProps {
  options?: Array<OptionMenuSelectionBoxProps>;
  value?: string | number;
  placeholder?: string | number;
  styleOption?: any;
  collapse?: boolean;
  setCollapsed?: Function;
  style?: any;
  styleMenu?: any;
  styleScroll?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
  icon?: any;
}

export interface OptionMenuSelectionBoxProps {
  selected?: boolean;
  onPress?: Function;
  styleOption?: any;
  value: any;
  iconType?: string;
  id?: string;
}

export default function SelectionBox(props: SelectionBoxProps) {
  const theme = useTheme();
  const t = useTranslate()

  function renderMenuOptions() {
    return props.options?.map((option: OptionMenuSelectionBoxProps, index: number) => (
      <MenuItem
        key={'option ' + index}
        
        onPress={() => {option.onPress?.(); props.setCollapsed?.(false)}}
        style={[
          {
            width: '100%',
            borderTopWidth: index !== 0 ? 1 : 0,
            paddingVertical: 9.5,
            paddingHorizontal: 16,
            borderColor: theme.colors.gray_300,
          },
          props.styleOption,
        ]}
        iconType={option.iconType ?? ''}
      >
        {option.value}
      </MenuItem>
    ));
  }

  return (
    <View style={[props.style]} accessible={true} accessibilityHint={props.accessibilityHint}>
        <AccordionButton
          collapsed={props.collapse}
          onPress={() => props.setCollapsed?.(!props.collapse)}
          styleTitle={{color: theme.colors.gray_600, fontSize: 12, fontWeight: '400', lineHeight: 18}}
          title={props.value ? props.value : props.placeholder}
          accordionIconSize={24}
          icon={props.icon}
          style={{borderRadius: 16,
            borderWidth: 1,
            borderColor: theme.colors.gray_300,
            padding: 8,
          }}
        />
      <Menu
        visible={props.collapse}
        anchor={<View style={{width: '100%'}} />}
        onRequestClose={() => props.setCollapsed?.(false)}
        style={[
          { alignItem: 'center', borderTopLeftRadius: 0, borderTopRightRadius: 0 },
          props.styleMenu,
        ]}
      >
        <View style={[props.styleScroll]}>
          <ScrollView>{renderMenuOptions()}</ScrollView>
        </View>
      </Menu>
    </View>
  );
}
