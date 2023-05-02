import React from 'react'
import { StyleSheet, View } from 'react-native';
import SnackBar, { SnackBarStyleProps } from './SnackBar';
import { useTheme } from '@src/context/themeContext';

interface SuccessSnackBarProps {
    message?: string;
    onPress?: any;
    style?: SnackBarStyleProps;
    time?: number;
}

export default function SuccessSnackBar(props: SuccessSnackBarProps) {
    const theme = useTheme();

    return (
    <View style={[styles.content, props.style?.content]}>
      <SnackBar
        text={props.message ?? 'Success'}
        icon={theme.drawables.general.Ic_Success}
        tintColor={theme.colors.success_05}
        onPress={props.onPress}
        time={props.time}
        style={{
          bar: [
            {
              backgroundColor: theme.colors.successBar,
            },
            props.style?.bar,
          ],
          text: [{ color: theme.colors.success_05 }, props.style?.text],
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