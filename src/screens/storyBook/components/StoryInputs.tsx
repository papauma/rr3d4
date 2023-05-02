import InputBar from '@src/components/commons/input/InputBar'
import React from 'react'
import { View } from 'react-native'

export default function StoryInputs() {
  return (
    <View style={{flex: 1}}>
        <InputBar placeholder={'Escriba'}/>
        <InputBar placeholder={'Escriba'} styleBar={{marginTop: 16}} actionIcon={true}/>
        <InputBar styleBar={{marginTop: 16}} placeholder={'Escriba'} actionIcon={true} showLens={true}/>
        <InputBar styleBar={{marginTop: 16}} placeholder={'Escriba'} actionIcon={true} showLens={true} sizeType='medium'/>
        <InputBar styleBar={{marginTop: 16}} placeholder={'Escriba'} actionIcon={true} showLens={true} sizeType='big'/>
    </View>
  )
}
