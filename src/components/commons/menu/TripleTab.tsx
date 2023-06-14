import {ThemeProps, useTheme} from '@src/context/themeContext';
import React from 'react';
import {Animated, Pressable, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

export interface ITabSection {
  title: string;
  content: any;
}

interface TripleTabProps {
  sections: Array<ITabSection>;
  styleContainer?: StyleProp<ViewStyle>;
}

const Tab = createMaterialTopTabNavigator();

export default function TripleTab(props: TripleTabProps) {
  const theme = useTheme();

  return (
    <Tab.Navigator
      tabBar={({state, descriptors, navigation, position}) => {
        return (
          <View style={[styles(theme).container, props.styleContainer]}>
            {state.routes.map((section: any, index: number) => {

              const { options } = descriptors[section.key];
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: section.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({ name: section.name, merge: true });
                }
              };

              /* const inputRange = state.routes.map((_, i) => i);
              const opacity = position.interpolate({
                inputRange,
                outputRange: inputRange.map(i => (i === index ? 1 : 0)),
              }); */

              return (
                <Pressable
                  key={index}
                  accessibilityState={isFocused ? { selected: true } : {}}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  style={[
                    isFocused
                      ? styles(theme).selectedSection
                      : styles(theme).section,
                    {flexGrow: 1},
                  ]}>
                  <Animated.Text
                    style={[
                      isFocused
                        ? styles(theme).selectedName
                        : styles(theme).name,
                      {textAlign: 'center'},
                    ]}>
                    {section.name}
                  </Animated.Text>
                </Pressable>
              );
            })}
          </View>
        );
      }}>
      {props.sections.map((section: ITabSection) => (
        <Tab.Screen name={section.title}>{() => section.content}</Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}

const styles = (theme: ThemeProps) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      backgroundColor: theme.colors.gray_200,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 12,
      marginBottom: 8,
    },
    selectedSection: {
      paddingVertical: 14,
      borderRadius: 16,
      backgroundColor: theme.colors.primary_300,
    },
    section: {},
    name: {
      fontWeight: '500',
      color: theme.colors.gray_700,
      fontSize: 14,
      lineHeight: 18.2,
      paddingHorizontal: 23,
      paddingVertical: 11,
    },
    selectedName: {
      fontWeight: '700',
      color: theme.colors.white,
      fontSize: 14,
      lineHeight: 18.2,
      paddingHorizontal: 23,
    },
  });
