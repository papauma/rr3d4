import React from 'react'
import { StyleSheet, View } from 'react-native';
import SnackBar, { SnackBarStyleProps } from './SnackBar';
import { useTheme } from '@src/context/themeContext';

interface ErrorSnackBarProps {
    message?: string;
    onPress?: any;
    style?: SnackBarStyleProps;
    time?: number;
}

export default function ErrorSnackBar(props: ErrorSnackBarProps) {
    const theme = useTheme();

    return (
    <View style={[styles.content, props.style?.content]}>
      <SnackBar
        text={props.message ?? 'Error'}
        icon={theme.drawables.general.Ic_Error}
        tintColor={theme.colors.error_05}
        onPress={props.onPress}
        time={props.time}
        style={{
          bar: [
            {
              backgroundColor: theme.colors.tertiary_pinkSoft,
            },
            props.style?.bar,
          ],
          text: [{ color: theme.colors.error_05 }, props.style?.text],
          elementsView: props.style?.elementsView,
        }}
      />
    </View>
    );
}

const styles = StyleSheet.create({
    content: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      },
})
