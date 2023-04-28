import React, { useState } from 'react'
import Button from '../commons/buttons/Button'
import { useTheme } from '@src/context/themeContext'
import LocationUtils from '@src/redux/hooks/LocationUtils';
import { useDispatch, useSelector } from 'react-redux';
import { locationInformation, locationSlice } from '@src/redux/slices/locationSlice';
import ActivateLocationModal from './ActivateLocationModal';
import { contextualSlice } from '@src/redux/slices/contextualSlice';
import { IPosition } from '@src/types/interfaces';

interface LocationButtonProps {
    onPress?: Function;
}

export default function LocationButton(props: LocationButtonProps) {
  const theme = useTheme();
  const {checkPermissions, getUserLocation} = LocationUtils();
  const locationInfo = useSelector(locationInformation);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  async function onPressLocation() {
    await checkPermissions().then((result: any) => {
        if (result) {
            dispatch(locationSlice.actions.updatedInitTracking(true))
            getUserLocation((location: IPosition) => props.onPress?.(location))
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
