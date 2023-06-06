import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import IconDynamic from '../icon/IconDynamic';
import Label from '../text/Label';
import Icon from '../icon/Icon';
import { useTheme } from '@src/context/themeContext';

interface InfoItemSectionProps {
    iconStatic?: any;
    iconId?: any;
    color?: string;
    title?: string;
    onPress?: Function;
    styleView?: StyleProp<ViewStyle>;
    accessibilityHint?: string;
  }
  
  export default function InfoItemSection(props: InfoItemSectionProps) {
   const theme = useTheme();

    return (
      <Pressable style={[styles.container, {backgroundColor: theme.colors.white}, props.styleView]} onPress={() => props.onPress?.()} accessibilityHint={props.accessibilityHint}>
        <View style={[styles.row]}>
          <IconDynamic accessible={false} alt={'Icono ' + props.title} source={props.iconStatic} iconId={props.iconId} color={props.color} />
          {props.title ? <Label style={styles.label}>{props.title}</Label> : null}
        </View>
        <Icon
          source={theme.drawables.general.Ic_Chevron_Right}
          style={{marginLeft: 16, flexShrink: 1}}
        />
      </Pressable>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    label: {
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 21,
      marginLeft: 12,
      marginRight: 8,
    },
  });