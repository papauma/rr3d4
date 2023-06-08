import InputBar from '@src/components/commons/input/InputBar'
import PasswordInput from '@src/components/commons/input/PasswordInput';
import { useTheme } from '@src/context/themeContext'
import React from 'react'
import { View } from 'react-native'

export default function StoryInputs() {
  const theme = useTheme();

  return (
    <View style={{flex: 1}}>
        <InputBar placeholder={'Escriba'}/>
        <InputBar placeholder={'Escriba'} styleBar={{marginTop: 16}} actionIcon={true}/>
        <InputBar styleBar={{marginTop: 16}} placeholder={'Escriba'} actionIcon={true} showLens={true}/>
        <InputBar styleBar={{marginTop: 16}} placeholder={'Escriba'} actionIcon={true} showLens={true} sizeType='medium'/>
        <InputBar styleBar={{marginTop: 16}} placeholder={'Escriba'} actionIcon={true} showLens={true} sizeType='big'/>
        <InputBar placeholder={'Escriba'} styleBar={{marginTop: 16}} leftIcon={theme.drawables.general.Ic_User}/>
        <InputBar placeholder={'Escriba'} styleBar={{marginTop: 16}} actionIcon={true} leftIcon={theme.drawables.general.Ic_User}/>
        <InputBar placeholder={'Escriba'} styleBar={{marginTop: 16}} showLens={true} leftIcon={theme.drawables.general.Ic_User}/>
        <InputBar placeholder={'Escriba'} styleBar={{marginTop: 16}} actionIcon={true} showLens={true} lensIcon={theme.drawables.general.Ic_Eye} leftIcon={theme.drawables.general.Ic_User}/>
        <PasswordInput placeholder={'Contraseña'} styleBar={{marginTop: 16}}/>
    </View>
  )
}
