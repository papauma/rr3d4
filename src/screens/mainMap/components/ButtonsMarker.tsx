import Button from '@src/components/commons/buttons/Button';
import { useTheme } from '@src/context/themeContext'
import React from 'react'
import { View } from 'react-native'

interface ButtonsMarkerProps { 
  onPlan?: Function;
}

export default function ButtonsMarker(props: ButtonsMarkerProps) {
  const theme = useTheme();

  return (
    <View style={{flexShrink: 1, alignSelf: 'flex-start', marginLeft: 8, display: 'flex',}}>
        <Button
            buttonCategory='tertiary'
            icon={theme.drawables.general.Ic_Star}
            style={{ paddingHorizontal: 8}}
        />
        <Button
            icon={theme.drawables.general.Ic_Plan}
            iconStyle={{tintColor: theme.colors.primary_800}}
            style={{paddingVertical: 10,paddingHorizontal: 8, marginTop: 8,}}
            onPress={() => props.onPlan?.()}
        />
    </View>
  )
}
