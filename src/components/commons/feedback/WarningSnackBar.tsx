import React from "react";
import { StyleSheet, View } from "react-native";
import SnackBar, { SnackBarStyleProps } from "./SnackBar";
import { useTheme } from "@src/context/themeContext";

interface WarningSnackBarProps {
    message?: string;
    onPress?: any;
    style?: SnackBarStyleProps;
    time?: number;
  }
  
  export default function WarningSnackBar(props: WarningSnackBarProps) {
    const theme = useTheme();

    return (
    <View style={[styles.content, props.style?.content]}>
      <SnackBar
        text={props.message ?? 'Warning'}
        icon={theme.drawables.general.Ic_Warning}
        tintColor={theme.colors.warning_05}
        onPress={props.onPress}
        time={props.time}
        style={{
          bar: [
            {
              backgroundColor: theme.colors.tertiary_yellowSoft,
            },
            props.style?.bar,
          ],
          text: [{ color: theme.colors.warning_05 }, props.style?.text],
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