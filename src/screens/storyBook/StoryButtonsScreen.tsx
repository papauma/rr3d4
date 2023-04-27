import Button from '@src/components/commons/buttons/Button'
import ButtonText from '@src/components/commons/buttons/ButtonText'
import Label from '@src/components/commons/text/Label'
import { useTheme } from '@src/context/themeContext'
import React from 'react'
import { SafeAreaView, ScrollView, TextInput, View } from 'react-native'

export default function StoryButtonsScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={{flex: 1, paddingVertical: 16}}>
      <ScrollView style={{ paddingHorizontal: 16}}>
        <Label>Botones primarios</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Primario Extra Small'
            buttonSizeStyle='extra-small'
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
          <Button title='Primario Small'
            buttonSizeStyle='small'
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
          <Button title='Primario Medium'
            buttonSizeStyle='medium'
              buttonCategory='primary'
              style={{marginVertical: 8}}/>
        </View>
        <Label>Botones primarios con icono</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Primario Extra Small'
              buttonSizeStyle='extra-small'
                buttonCategory='primary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='extra-small'
              buttonCategory='primary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Primario Small'
              buttonSizeStyle='small'
                buttonCategory='primary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='small'
              buttonCategory='primary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Primario Medium'
              buttonSizeStyle='medium'
                buttonCategory='primary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='medium'
              buttonCategory='primary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
        </View>
        <Label>Botones primarios disabled</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Primario Extra Small'
            buttonSizeStyle='extra-small'
              buttonCategory='primary'
              disabled={true}
              style={{marginVertical: 8}}/>
          <Button title='Primario Small'
            buttonSizeStyle='small'
              buttonCategory='primary'
              disabled={true}
              style={{marginVertical: 8}}/>
          <Button title='Primario Medium'
            buttonSizeStyle='medium'
              buttonCategory='primary'
              disabled={true}
              style={{marginVertical: 8}}/>
        </View>
        <Label>Botones primarios disabled con icono</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Primario Extra Small'
              buttonSizeStyle='extra-small'
              disabled={true}
                buttonCategory='primary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='extra-small'
              buttonCategory='primary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Primario Small'
              buttonSizeStyle='small'
              disabled={true}
                buttonCategory='primary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='small'
              buttonCategory='primary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Primario Medium'
              buttonSizeStyle='medium'
                buttonCategory='primary'
                disabled={true}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='medium'
              buttonCategory='primary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
        </View>
        <Label>Botones secundarios</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Secundario Extra Small'
            buttonSizeStyle='extra-small'
              buttonCategory='secondary'
              style={{marginVertical: 8}}/>
          <Button title='Secundario Small'
            buttonSizeStyle='small'
              buttonCategory='secondary'
              style={{marginVertical: 8}}/>
          <Button title='Secundario Medium'
            buttonSizeStyle='medium'
              buttonCategory='secondary'
              style={{marginVertical: 8}}/>
        </View>
        <Label>Botones secundarios con icono</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Secundario Extra Small'
              buttonSizeStyle='extra-small'
                buttonCategory='secondary'
                iconStyle={{tintColor: 'red'}}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='extra-small'
              buttonCategory='secondary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Secundario Small'
              buttonSizeStyle='small'
                buttonCategory='secondary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='small'
              buttonCategory='secondary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Secundario Medium'
              buttonSizeStyle='medium'
                buttonCategory='secondary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='medium'
              buttonCategory='secondary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
        </View>
        <Label>Botones secundarios disabled</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Secundario Extra Small'
            buttonSizeStyle='extra-small'
              buttonCategory='secondary'
              disabled={true}
              style={{marginVertical: 8}}/>
          <Button title='Secundario Small'
            buttonSizeStyle='small'
              buttonCategory='secondary'
              disabled={true}
              style={{marginVertical: 8}}/>
          <Button title='Secundario Medium'
            buttonSizeStyle='medium'
              buttonCategory='secondary'
              disabled={true}
              style={{marginVertical: 8}}/>
        </View>
        <Label>Botones secundarios disabled con icono</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Secundario Extra Small'
              buttonSizeStyle='extra-small'
                buttonCategory='secondary'
                disabled={true}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='extra-small'
              buttonCategory='secondary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Secundario Small'
              buttonSizeStyle='small'
                buttonCategory='secondary'
                disabled={true}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='small'
              buttonCategory='secondary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Secundario Medium'
              buttonSizeStyle='medium'
                buttonCategory='secondary'
                disabled={true}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='medium'
              buttonCategory='secondary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
        </View>
        <Label>Botones terciarios</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Terciario Extra Small'
            buttonSizeStyle='extra-small'
              buttonCategory='tertiary'
              style={{marginVertical: 8}}/>
          <Button title='Terciario Small'
            buttonSizeStyle='small'
              buttonCategory='tertiary'
              style={{marginVertical: 8}}/>
          <Button title='Terciario Medium'
            buttonSizeStyle='medium'
              buttonCategory='tertiary'
              style={{marginVertical: 8}}/>
        </View>
        <Label>Botones terciarios con icono</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Terciario Extra Small'
              buttonSizeStyle='extra-small'
                buttonCategory='tertiary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='extra-small'
              buttonCategory='tertiary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Terciario Small'
              buttonSizeStyle='small'
                buttonCategory='tertiary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='small'
              buttonCategory='tertiary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Terciario Medium'
              buttonSizeStyle='medium'
                buttonCategory='tertiary'
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='medium'
              buttonCategory='tertiary'
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
        </View>
        <Label>Botones terciarios disabled</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <Button title='Terciario Extra Small'
            buttonSizeStyle='extra-small'
              buttonCategory='tertiary'
              disabled={true}
              style={{marginVertical: 8}}/>
          <Button title='Terciario Small'
            buttonSizeStyle='small'
              buttonCategory='tertiary'
              disabled={true}
              style={{marginVertical: 8}}/>
          <Button title='Terciario Medium'
            buttonSizeStyle='medium'
              buttonCategory='tertiary'
              disabled={true}
              style={{marginVertical: 8}}/>
        </View>
        <Label>Botones terciarios disabled con icono</Label>  
        <View style={{justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Terciario Extra Small'
              buttonSizeStyle='extra-small'
                buttonCategory='tertiary'
                disabled={true}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='extra-small'
              buttonCategory='tertiary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Terciario Small'
              buttonSizeStyle='small'
                buttonCategory='tertiary'
                disabled={true}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='small'
              buttonCategory='tertiary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
            <Button title='Terciario Medium'
              buttonSizeStyle='medium'
                buttonCategory='tertiary'
                disabled={true}
                icon={theme.drawables.general.Ic_storyIcon}
                style={{marginVertical: 8}}/>
            <Button
              buttonSizeStyle='medium'
              buttonCategory='tertiary'
              disabled={true}
              icon={theme.drawables.general.Ic_storyIcon}
              style={{marginVertical: 8}}/>
          </View>
        </View>
        <Label>Botones con texto</Label>  
        <View style={{justifyContent: 'space-evenly', flexDirection: 'row'}}>
          <ButtonText staticIcon={theme.drawables.general.Ic_storyIcon}  title='metro'/>
          <ButtonText staticIcon={theme.drawables.general.Ic_storyIcon}  title='bus' selected={true}/>
          <ButtonText disabled={true} staticIcon={theme.drawables.general.Ic_storyIcon}  title='tren'/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
