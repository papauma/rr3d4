import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export async function CustomPrompt() {
  return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: 'Cool Photo App Camera Permission',
    message: 'Cool Photo App needs access to your camera ' + 'so you can take awesome pictures.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  });
}

export async function RequestPermissionsLocation() {
  if (Platform.OS !== 'ios') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted;
  } else {
    const granted = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(async (result: any) => {
      console.log('Permission', result);

      if (result !== RESULTS.GRANTED) {
        return await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      return 'granted';
    });

    return granted;
  }
}

export async function getRequestPermissionsLocation() {
  // const resultPermissionsLocation = await RequestPermissionsLocation();
  return await RequestPermissionsLocation();
  // a && RequestActivateGPS();
}

export async function permissionsWithGpsDialog() {
  let userPosition;
  let permissionsError;
  const myPromise = new Promise<void>(async (resolve, reject) => {
    let resRequestPermissionsLocation = await getRequestPermissionsLocation();
    if (resRequestPermissionsLocation === 'granted') {
      await Geolocation.getCurrentPosition(
        (position) => {
          userPosition = position;
          resolve();
        },
        (error) => {
          permissionsError = error;
          resolve();
        },
        { showLocationDialog: true, enableHighAccuracy: true },
      );
    }
  });
  await myPromise;
  return { userPosition, permissionsError };
}
