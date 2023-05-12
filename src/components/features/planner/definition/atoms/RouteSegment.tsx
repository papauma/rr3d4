import LabelBar from '@src/components/widgets/LabelBar';
import { useTheme } from '@src/context/themeContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';

/* Input de texto para las búsquedas desde el planificador junto con su icono de drag and drop */

interface RouteSegmentProps {
  style?: any;
  backgroundColor?: string;
  name?: string;
  onPress?: Function;
  onActionPress?: Function;
  icon?: any;
  onIconDeletePress?: Function;
  placeholder?: string;
}

export default function RouteSegment({
  style,
  backgroundColor,
  name,
  onPress,
  onActionPress,
  icon,
  onIconDeletePress,
  placeholder,
}: RouteSegmentProps) {
  const theme = useTheme();

  const onActionPressed = () => {
    onActionPress?.();
  };

  return (
    <View style={[styles.content, style]} accessible={true} /* accessibilityHint='Abre el buscador' */>
      <LabelBar
        backgroundColor={theme.colors.white}
        onDrawableClick={onIconDeletePress}
        size={40}
        style={[styles.input, style]}
        value={name}
        onPressIn={onPress}
        icon={icon}
        actionIcon={theme.drawables.general.Ic_Close}
        actionTint={theme.colors.gray_700}
        placeholder={placeholder ?? ''}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flexGrow: 1,
    padding: 12,
    flexShrink: 1,
  },
});
