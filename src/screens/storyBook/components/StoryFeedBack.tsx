import React from 'react'
import { View } from 'react-native'
import Button from '@src/components/commons/buttons/Button'
import { useDispatch } from 'react-redux'
import { contextualSlice } from '@src/redux/slices/contextualSlice';

export default function StoryFeedBack() {
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
        <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Mostrar warning barra'
            buttonSizeStyle='small'
            onPress={() => dispatch(contextualSlice.actions.updateWarningMessage('Warning'))}
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
          <Button title='Mostrar info barra'
            onPress={() => dispatch(contextualSlice.actions.updateInfoMessage('Info'))}
            buttonSizeStyle='small'
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
          <Button title='Mostrar éxito barra'
            onPress={() => dispatch(contextualSlice.actions.updateSucessMessage('Success'))}
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
            <Button title='Mostrar error barra'
              onPress={() => dispatch(contextualSlice.actions.updateErrorMessage('Error'))}
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
        </View>
    </View>
  )
}
