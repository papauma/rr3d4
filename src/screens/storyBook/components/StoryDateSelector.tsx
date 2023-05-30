import Label from '@src/components/commons/text/Label'
import DateSelectorModal from '@src/components/widgets/DateSelectorModal'
import HoursWheel from '@src/components/widgets/HoursWheel'
import React, { useState } from 'react'
import { View } from 'react-native'

export default function StoryDateSelector() {
  const [date, setDate] = useState(new Date())

  console.log('Date', date);
  
  return (
    <View style={{flexDirection: 'row'}}>
        
        <DateSelectorModal
            callback={(result: any) => setDate(result.date)}
        />
        {/* <HoursWheel
            styleSeparator={{width: 50}}
        /> */}
        {/* <Label>{`Día: ${date}`}</Label> */}
    </View>
  )
}
