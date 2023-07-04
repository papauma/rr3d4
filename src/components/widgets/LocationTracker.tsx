import LocationUtils from '@src/redux/hooks/LocationUtils';
import { locationInformation, locationSlice } from '@src/redux/slices/locationSlice';
import React, { useEffect } from 'react'
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import { useDispatch, useSelector } from 'react-redux';

export default function LocationTracker({children}: {children: any}) {
  const locationInfo = useSelector(locationInformation);
  const grantedLocation = locationInfo.granted;
  const countNotShowingLocation = locationInfo.countNotShowingLocation;
  const {trackLocation, clearTrackLocation} = LocationUtils();
  const dispatch = useDispatch();

 /**
   * Cada vez que inicialice la aplicación obtendrá la ubicación y si
   * no estuviera activada preguntará por el permiso
   *  */
 useEffect(() => {
    let tracking: number | null = null;
    async function getter() {
      await check(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      )
        .then((res: any) => {
          if (
            countNotShowingLocation < 2 &&
            locationInfo.initTracking &&
            res === RESULTS.GRANTED
          ) {
            dispatch(locationSlice.actions.updatedTracking(true));
            tracking = trackLocation(2000, () => {
              dispatch(
                locationSlice.actions.updateCountLocation(
                  countNotShowingLocation + 1,
                ),
              );
              dispatch(locationSlice.actions.updatedInitTracking(false));
              dispatch(locationSlice.actions.updatedTracking(false));
            });
          } else {
            dispatch(locationSlice.actions.updatedTracking(false));
          }
        })
        .catch(e => {});
    }

    getter();

    return () => {
      typeof tracking === 'number' && clearTrackLocation(tracking);
    };
  }, [grantedLocation, 
    locationInfo.initTracking, 
    countNotShowingLocation, 
    dispatch, 
    trackLocation, 
    clearTrackLocation
]);   

  return (
    <>{children}</>
  )
}
