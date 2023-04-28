import React from 'react'
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';

export default function LocationUtils() {

  async function checkPermissions() {
    return (
      RESULTS.GRANTED ===
      (await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ))
    );
  }  

  return {
    checkPermissions,
  }
}
