import Button from '@src/components/commons/buttons/Button'
import CenteredModal from '@src/components/commons/modal/CenteredModal'
import Label from '@src/components/commons/text/Label'
import { contextualSlice } from '@src/redux/slices/contextualSlice'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'

export default function StoryModals() {
  const [showCenteredModalSimple, setShowCenteredModalSimple] = useState(false)
  const [showCenteredModalScroll, setShowCenteredModalScroll] = useState(false)
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1}}>
       <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Mostrar modal simple'
            buttonSizeStyle='small'
            onPress={() => {
                dispatch(contextualSlice.actions.updateShowBackground(true))
                setShowCenteredModalSimple(true)
            }}
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
          <Button title='Mostrar modal con scroll'
            onPress={() => {
                dispatch(contextualSlice.actions.updateShowBackground(true))
                setShowCenteredModalScroll(true)
            }}
            buttonSizeStyle='small'
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
        </View> 
        <CenteredModal visible={showCenteredModalSimple} 
                       setViewModal={() => {
                        setShowCenteredModalSimple(false)
                        dispatch(contextualSlice.actions.updateShowBackground(false))
                       }}
                       showCloseButton={true}
                       title='Título de prueba'
                       description='Lorem ipsum '
                       button1='Aceptar'
                       button2='Cerrar'
                       onPressButton1={() => {
                        setShowCenteredModalSimple(false)
                        dispatch(contextualSlice.actions.updateShowBackground(false))
                       }}
                       onPressButton2={() => {
                        setShowCenteredModalSimple(false)
                        dispatch(contextualSlice.actions.updateShowBackground(false))
                       }}
                       />
        <CenteredModal visible={showCenteredModalScroll} 
                       setViewModal={() => {
                        setShowCenteredModalScroll(false)
                        dispatch(contextualSlice.actions.updateShowBackground(false))
                       }}
                       showCloseButton={true}
                       title='Título de prueba'
                       description='Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. '
                       button1='Aceptar con scroll esto es largo'
                       button2='Cerrar con scroll  esto es largo'
                       onPressButton1={() => {
                        setShowCenteredModalScroll(false)
                        dispatch(contextualSlice.actions.updateShowBackground(false))
                       }}
                       onPressButton2={() => {
                        setShowCenteredModalScroll(false)
                        dispatch(contextualSlice.actions.updateShowBackground(false))
                       }}
        >
          <View style={{paddingBottom: 16}}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21].map((element: any, index: number) => (<Label key={'id ' +  index} style={{fontSize: 16}}>{'Ejemplo ' +  index}</Label>))}           
          </View>  
        </CenteredModal>
    </View>
  )
}
