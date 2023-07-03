import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {BottomSheetHandleProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {toRad} from 'react-native-redash';
import { ThemeProps, useTheme } from '@src/context/themeContext';

// @ts-ignore
export const transformOrigin = ({x, y}, ...transformations) => {
  'worklet';
  return [
    {translateX: x},
    {translateY: y},
    ...transformations,
    {translateX: x * -1},
    {translateY: y * -1},
  ];
};

interface HandleProps extends BottomSheetHandleProps {
  style?: StyleProp<ViewStyle>;
}

const HandleBottomSheet: React.FC<HandleProps> = ({style, animatedIndex, topContent}) => {
  const theme = useTheme()  

  //#region animations
  const indicatorTransformOriginY = useDerivedValue(() =>
    interpolate(animatedIndex.value, [0, 1, 2], [-1, 0, 1], Extrapolate.CLAMP),
  );
  //#endregion

  //#region styles
  const containerStyle = useMemo(() => [styles(theme).header, style], [style, theme]);
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const borderTopRadius = interpolate(
      animatedIndex.value,
      [1, 2],
      [20, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    };
  });
  const leftIndicatorStyle = useMemo(
    () => ({
      ...styles(theme).indicator,
      ...styles(theme).leftIndicator,
    }),
    [],
  );
  const leftIndicatorAnimatedStyle = useAnimatedStyle(() => {
    const leftIndicatorRotate = interpolate(
      animatedIndex.value,
      [0, 1, 2],
      [toRad(-30), toRad(-30), toRad(30)],
      Extrapolate.CLAMP,
    );
    return {
      transform: transformOrigin(
        {x: 0, y: indicatorTransformOriginY.value},
        {
          rotate: `${leftIndicatorRotate}rad`,
        },
        {
          translateX: -5,
        },
      ),
    };
  });
  const rightIndicatorStyle = useMemo(
    () => ({
      ...styles(theme).indicator,
      ...styles(theme).rightIndicator,
    }),
    [],
  );
  const rightIndicatorAnimatedStyle = useAnimatedStyle(() => {
    const rightIndicatorRotate = interpolate(
      animatedIndex.value,
      [0, 1, 2],
      [toRad(30), toRad(30), toRad(-30)],
      Extrapolate.CLAMP,
    );
    return {
      transform: transformOrigin(
        {x: 0, y: indicatorTransformOriginY.value},
        {
          rotate: `${rightIndicatorRotate}rad`,
        },
        {
          translateX: 5,
        },
      ),
    };
  });
  //#endregion

  // render
  return (
    <>
        {topContent}
        <Animated.View
        style={[containerStyle, containerAnimatedStyle]}
        renderToHardwareTextureAndroid={true}>
        <Animated.View style={[leftIndicatorStyle, leftIndicatorAnimatedStyle]} />
        <Animated.View
            style={[rightIndicatorStyle, rightIndicatorAnimatedStyle]}
        />
        </Animated.View>
    </>
  );
};

export default HandleBottomSheet;

const styles = (theme: ThemeProps) => StyleSheet.create({
  header: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    paddingVertical: 14,
    //borderBottomWidth: 1,
    //borderBottomColor: '#fff',
  },
  indicator: {
    position: 'absolute',
    width: 10,
    height: 4,
    backgroundColor: theme.colors.gray_400,
  },
  leftIndicator: {
    borderTopStartRadius: 2,
    borderBottomStartRadius: 2,
  },
  rightIndicator: {
    borderTopEndRadius: 2,
    borderBottomEndRadius: 2,
  },
});