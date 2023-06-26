import React from 'react'
import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Navbar from '@src/components/widgets/Navbar';
import MainMapScreen from '../mainMap/MainMapScreen';
import Icon from '@src/components/commons/icon/Icon';
import { useTheme } from '@src/context/themeContext';
import { View } from 'react-native';
import StoryBookScreen from '../storyBook/StoryBookScreen';
import SettingsScreen from '../settings/SettingsScreen';
import PlannerScreen from '../planner/PlannerScreen';
import FavoritesScreen from '../favorites/FavoritesScreen';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
  const theme = useTheme();

  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBar={(props: BottomTabBarProps) => <Navbar {...props}/>}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle: {paddingBottom: 8, paddingTop: 8},
        lazy: true,
      }}>
        <Tab.Screen
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused}) => <Icon source={ theme.drawables.general.Ic_route} 
                tint={focused ? theme.colors.primary_800 : undefined}/>
            }}
            name={'Planner'}
        >
            {props => <PlannerScreen />}
        </Tab.Screen>
        <Tab.Screen
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused}) => <Icon source={theme.drawables.general.Ic_Star} tint={focused ? theme.colors.primary_800 : undefined}/>
            }}
            name={'Favorites'}
        >
            {props => <FavoritesScreen />}
        </Tab.Screen>
        <Tab.Screen
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused}) => <Icon source={theme.drawables.general.Ic_LocationHome} tint={focused ? theme.colors.primary_800 : theme.colors.gray_400}/>
            }}
            name={'Home'}
        >
            {props => <MainMapScreen />}
        </Tab.Screen>
        <Tab.Screen
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused}) => <Icon source={theme.drawables.general.Ic_Heart} tint={focused ? theme.colors.primary_800 : undefined}/>
            }}
            name={'Events'}
        >
            {props => <StoryBookScreen />}
        </Tab.Screen>
        <Tab.Screen
            options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused}) => <Icon source={theme.drawables.general.Ic_Burger} 
                tint={focused ? theme.colors.primary_800 : undefined}/>
            }}
            name={'Settings'}
        >
            {props => <SettingsScreen />}
        </Tab.Screen>
      </Tab.Navigator>
  )
}
