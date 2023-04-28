import React from 'react'
import CenteredModal from '../commons/modal/CenteredModal'
import { useTranslate } from '@src/context/languageContext';
import { useDispatch } from 'react-redux';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';
import { Alert, Linking, Platform } from 'react-native';

interface ActivateLocationModalProps {
    visible: boolean;
    setVisible?: Function;
}

export default function ActivateLocationModal(props: ActivateLocationModalProps) {
  const t = useTranslate();
  const dispatch = useDispatch();
  let locationPermission = {
    code: [Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
  }

  const unBlockAlert = () => {
    Alert.alert(t('location_activate_blocked_title'), t('location_activate_blocked_description'), [
      {
        text: t('button_cancel'),
        onPress: () => {
            props.setVisible?.()
        },
        style: 'cancel',
      },
      {
        text: t('button_accept'),
        onPress: () => {
          Linking.openSettings();
          props.setVisible?.()
        },
      },
    ]);
  };

  async function grantLocationPermissions () {
      await check(locationPermission.code[0]).then(async (result: any) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            //'This feature is not available (on this device / in this context)',
            props.setVisible?.()
            break;
          case RESULTS.DENIED:
            //'The permission has not been requested / is denied but requestable',
            await request(locationPermission.code[0]).then(
              async (requestResult: any) => {
                switch (requestResult) {
                  case RESULTS.GRANTED:
                    //'The permission is granted'
                    /* dispatch(
                      locationPermissionSlice.actions.grantLocation(true),
                    ); */
                    props.setVisible?.()    
                    break;
                  case RESULTS.BLOCKED:
                    unBlockAlert();
                    break;
                  default:
                    
                    break;
                }
              },
            );
            break;
          case RESULTS.LIMITED:
            //'The permission is limited: some actions are possible'
            break;
          case RESULTS.GRANTED:
            //'The permission is granted'
            props.setVisible?.()
            break;
          default:
            //'The permission is denied and not requestable anymore'
            unBlockAlert();
            break;
        }
      });
  };  

  return (
    <CenteredModal 
        visible={props.visible} 
        setViewModal={() => {props.setVisible?.(false)}}
        button1={t('button_accept')}
        button2={t('button_cancel')}
        onPressButton1={() => grantLocationPermissions()}
        onPressButton2={() => {props.setVisible?.(false)}}
        title={t('location_activate_title')}
        description={t('location_activate_description')}
        modalViewStyle={{borderRadius: 16}}
        showCloseButton={true}
    />
  )
}
