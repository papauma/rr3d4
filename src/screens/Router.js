import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '@src/screens/splash/SplashScreen';
import { navigationPages } from '@src/utils/constants';
import React, { useRef } from 'react';
import ListReportScreen from './listReportScreen/ListReportScreen';
import MainScreen from './mainScreen/MainScreen';
import ReportMapScreen from './reportMapScreen/ReportMapScreen';
import ReportPhotoscreen from './reportPhotoScreen/ReportPhotoScreen';
import ReportTextScreen from './reportTextScreen/ReportTextScreen';
import ConfirmReportScreen from './confirmReportScreen/ConfirmReportScreen';
import ResultReportScreen from './resultReportScreen/ResultReportScreen';

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

const ReportTextComponent = ({navigation, route, options, back}) => {
  return <ReportTextScreen />;
};

const ReportPhotoComponent = ({navigation, route, options, back}) => {
  return <ReportPhotoscreen />;
};

const ReportMapComponent = ({navigation, route, options, back}) => {
  return <ReportMapScreen />;
};


const ListReportComponent = ({navigation, route, options, back}) => {
  return <ListReportScreen />;
};
const ConfirmReportComponent = ({navigation, route, options, back}) => {
  return <ConfirmReportScreen />;
};

const ResultReportComponent = ({navigation, route, options, back}) => {
  return <ResultReportScreen />;
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
    >
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen name={navigationPages.main} component={MainComponent} />
        <Stack.Screen name={navigationPages.splash} component={SplashComponent} />
        <Stack.Screen name={navigationPages.reportText} component={ReportTextComponent} />
        <Stack.Screen name={navigationPages.reportPhoto} component={ReportPhotoComponent} />
        <Stack.Screen name={navigationPages.reportMap} component={ReportMapComponent} />
        <Stack.Screen name={navigationPages.listReport} component={ListReportComponent} />
        <Stack.Screen name={navigationPages.confirm} component={ConfirmReportComponent} />
        <Stack.Screen name={navigationPages.result} component={ResultReportComponent} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}
