import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '@src/components/widgets/Navbar';
import TempComp from '@src/components/widgets/TempComp';
import SplashScreen from '@src/screens/splash/SplashScreen';
import { navigationPages } from '@src/utils/constants';
import React, { useRef } from 'react';
import LanguageScreen from '@src/screens/language/LanguageScreen';
import StoryButtonsScreen from './storyBook/StoryButtonsScreen';
import MainScreen from './main/MainScreen';

const Stack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

const SplashComponent = ({navigation, route, options, back}) => {
  return <SplashScreen navigation={navigation} />;
};

const MainComponent = ({navigation, route, options, back}) => {
  return <MainScreen navigation={navigation} />;
};

const LanguageComponent = ({navigation, route, options, back}) => {
  return <LanguageScreen navigation={navigation} />;
};

const StoryButtonsComponent = ({navigation, route, options, back}) => {
  return <StoryButtonsScreen navigation={navigation} />;
};


export default function Routes() {

  const routeNameRef = useRef();
  const navigationRef = useRef();

  return (
    <>
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
      }}
      onStateChange={async () => {
        const currentRouteName = navigationRef?.current?.getCurrentRoute()?.name;
        routeNameRef.current = currentRouteName;
      }}
      //linking={links}
    >
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={navigationPages.main} component={MainComponent} />
        <Stack.Screen name={navigationPages.splash} component={SplashComponent} />
        <Stack.Screen name={navigationPages.language} component={LanguageComponent} />
        <Stack.Screen name={navigationPages.storybook} component={StoryButtonsComponent} />
      </Stack.Navigator>
      {/* <Navbar />
      <TempComp /> */}
    </NavigationContainer>
    </>
  );
}
