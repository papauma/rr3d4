import React from 'react'
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';

export default function LocationUtils() {
  const dispatch = useDispatch();

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

  function getUserLocation(callbackGetLocation: Function, count?: number, callbackOnErrorCode2?: Function) {
    let onLocationReceived = (location: any) => {
      /* dispatch(
        locationSlice.actions.updateLocation({
          latitude: parseFloat(location.coords.latitude.toFixed(5)),
          longitude: parseFloat(location.coords.longitude.toFixed(5)),
        }),
      ); */
      callbackGetLocation({
        latitude: parseFloat(location.coords.latitude.toFixed(5)),
        longitude: parseFloat(location.coords.longitude.toFixed(5)),
      })
    };

    let onError = (error: any) => {
      //caso en el que no tengas actuvada la ubicación
      if (error?.code === 2) {
        callbackOnErrorCode2?.()
        return null;
      }

      //si falla repetir 3 veces la obteneción de la ubi (recursivo)
      if (count === undefined) {
        return getUserLocation(callbackGetLocation, 3);
      }

      //mientras el contador sea mayor que 0 volver a pedir la ubi
      if (count > 0) {
        return getUserLocation(callbackGetLocation, count - 1);
      }

      return null;
    };

    let options = {
      enableHighAccuracy: false,
      timeout: 3000,
      maximumAge: 1000,
    };

    Geolocation.getCurrentPosition(onLocationReceived, onError, options);
    //return userLocation;
  }

  return {
    checkPermissions,
    getUserLocation,
  }
}
