import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Navbar from '@src/components/widgets/Navbar';
import TempComp from '@src/components/widgets/TempComp';
import SplashScreen from '@src/screens/splash/SplashScreen';
import { navigationPages } from '@src/utils/constants';
import React, { useRef } from 'react';
import MainScreen from './main/MainScreen';
import StoryBookScreen from './storyBook/StoryBookScreen';
import LanguageScreen from './settings/language/LanguageScreen';
import FiltersScreen from './filters/FiltersScreen';
import SearchScreen from './search/SearchScreen';
import PlannerScreen from './planner/PlannerScreen';
import PlannerPreferencesScreen from './planner/preferences/PlannerPreferencesScreen';

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

const FiltersComponent = ({navigation, route, options, back}) => {
  return <FiltersScreen />;
};

const SearchComponent = ({navigation, route, options, back}) => {
  return <SearchScreen {...route.params} />;
};

const PlannerComponent = ({navigation, route, options, back}) => {
  return <PlannerScreen {...route.params} />;
};

const PlannerPreferencesComponent = ({navigation, route, options, back}) => {
  return <PlannerPreferencesScreen {...route.params} />;
};

const LanguageComponent = ({navigation, route, options, back}) => {
  return <LanguageScreen navigation={navigation} />;
};

const StoryButtonsComponent = ({navigation, route, options, back}) => {
  return <StoryBookScreen navigation={navigation} />;
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
        <Stack.Screen name={navigationPages.filters} component={FiltersComponent} />
        <Stack.Screen name={navigationPages.search} component={SearchComponent} />
        <Stack.Screen name={navigationPages.planner} component={PlannerComponent} />
        <Stack.Screen name={navigationPages.plannerPreferences} component={PlannerPreferencesComponent} />
        <Stack.Screen name={navigationPages.language} component={LanguageComponent} />
        <Stack.Screen name={navigationPages.storybook} component={StoryButtonsComponent} />
      </Stack.Navigator>
      {/* <Navbar />
      <TempComp /> */}
    </NavigationContainer>
    </>
  );
}
