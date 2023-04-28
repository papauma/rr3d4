import React, { useState } from 'react'
import Button from '../commons/buttons/Button'
import { useTheme } from '@src/context/themeContext'
import LocationUtils from '@src/redux/hooks/LocationUtils';
import { useDispatch, useSelector } from 'react-redux';
import { locationInformation } from '@src/redux/slices/locationSlice';
import ActivateLocationModal from './ActivateLocationModal';
import { contextualSlice } from '@src/redux/slices/contextualSlice';

export default function LocationButton() {
  const theme = useTheme();
  const {checkPermissions} = LocationUtils();
  const locationInfo = useSelector(locationInformation);
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();

  async function onPressLocation() {
    await checkPermissions().then((result: any) => {
        if (result) {

        } else {
            dispatch(contextualSlice.actions.updateShowBackground(true))
            setShowModal(true);
        }
    })
  }

  return (
    <>
        <Button iconStyle={locationInfo.tracking ? undefined : {tintColor: theme.colors.gray_400}}
                buttonCategory='secondary'
                onPress={onPressLocation}
                icon={theme.drawables.general.Ic_location_desactivated}/>
        <ActivateLocationModal visible={showModal} 
                               setVisible={() => {dispatch(contextualSlice.actions.updateShowBackground(false)); setShowModal(false)}}/>
    </>
  )
}
