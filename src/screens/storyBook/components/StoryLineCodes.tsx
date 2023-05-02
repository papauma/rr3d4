import LineCodeSemiCircle from '@src/components/commons/routeCode/LineCodeSemiCircle'
import RouteCodeBox from '@src/components/commons/routeCode/RouteCodeBox';
import { useTheme } from '@src/context/themeContext'
import React from 'react'
import { View } from 'react-native'

export default function StoryLineCodes() {
  const theme = useTheme();

  return (
    <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly'}}>
            <LineCodeSemiCircle code='1' backgroundColor='blue'/>
            <LineCodeSemiCircle code='12' backgroundColor='red'/>
            <LineCodeSemiCircle code='12' backgroundColor='green' transportMode={7}/>
            <LineCodeSemiCircle code='12' backgroundColor='green' disabled={true}/>
            <LineCodeSemiCircle code='12' backgroundColor='pink' transportMode={7} icon={theme.drawables.general.Ic_Data_Protection}/>
            <LineCodeSemiCircle code='12' backgroundColor='green' transportMode={7} icon={theme.drawables.general.Ic_Data_Protection} disabled={true}/>
        </View>
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-evenly', marginTop: 16}}>
            <RouteCodeBox code='1' backgroundColor='blue' icon={theme.drawables.general.Ic_Bus}/>
            <RouteCodeBox code='12' backgroundColor='red' icon={theme.drawables.general.Ic_Bus}/>
            <RouteCodeBox code='12' backgroundColor='green' icon={theme.drawables.general.Ic_Bus}/>
            <RouteCodeBox code='12' backgroundColor='green' icon={theme.drawables.general.Ic_Bus} disabled={true}/>
        </View>
    </View>
  )
}
