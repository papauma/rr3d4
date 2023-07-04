import AccordionOption from '@src/components/commons/accordion/AccordionOption'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import StoryButtons from './components/StoryButtons'
import Label from '@src/components/commons/text/Label'
import StoryFeedBack from './components/StoryFeedBack'
import { useDispatch, useSelector } from 'react-redux'
import { contextualInformation, contextualSlice } from '@src/redux/slices/contextualSlice'
import InfoSnackBar from '@src/components/commons/feedback/InfoSnackBar'
import SuccessSnackBar from '@src/components/commons/feedback/SuccessSnackBar'
import ErrorSnackBar from '@src/components/commons/feedback/ErrorSnackBar'
import WarningSnackBar from '@src/components/commons/feedback/WarningSnackBar'
import BackgroundModal from '@src/components/commons/modal/BackgroundModal'
import StoryModals from './components/StoryModals'
import StoryInputs from './components/StoryInputs'
import StoryLineCodes from './components/StoryLineCodes'
import StoryCards from './components/StoryCards'
import StoryDateSelector from './components/StoryDateSelector'
import StoryAlertCard from './components/StoryAlertCard'

export default function StoryBookScreen() {
  const [showStoryButtons, setShowStoryButtons] = useState(false)
  const [showStoryFeedback, setShowStoryFeedback] = useState(false)
  const [showStoryModals, setShowStoryModals] = useState(false)
  const [showStoryInputs, setShowStoryInputs] = useState(false)
  const [showStoryLineCodes, setShowStoryLineCodes] = useState(false)
  const [showStoryCards, setShowStoryCards] = useState(false)
  const [showDateSelector, setShowDateSelector] = useState(false)
  const [showAlertCard, setShowAlertCard] = useState(false)
  const contextualInfo = useSelector(contextualInformation);
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={{flex: 1, paddingVertical: 16}}>
        <Label style={{paddingHorizontal: 16, fontSize: 22, fontWeight: 'bold', marginBottom: 16}}>{'Story book'}</Label>
            <ScrollView style={{paddingHorizontal: 16}}>
                <AccordionOption
                  styleView={{marginBottom: 16,}}
                  styleText={{fontSize: 16, fontWeight: '700'}}
                  name='Botones'
                  pressed={showStoryButtons}
                  onPress={() => setShowStoryButtons(!showStoryButtons)}/>
                {showStoryButtons && <StoryButtons/>}
                <AccordionOption
                  styleView={{marginBottom: 16, flexGrow: 1}}
                  styleText={{fontSize: 16, fontWeight: '700', flexGrow: 1}}
                  name='Gestión feedback'
                  pressed={showStoryFeedback}
                  onPress={() => setShowStoryFeedback(!showStoryFeedback)}/>
                {showStoryFeedback && <StoryFeedBack/>}
                <AccordionOption
                  styleView={{marginBottom: 16, flexGrow: 1}}
                  styleText={{fontSize: 16, fontWeight: '700', flexGrow: 1}}
                  name='Modales'
                  pressed={showStoryModals}
                  onPress={() => setShowStoryModals(!showStoryModals)}/>
                {showStoryModals && <StoryModals/>}
                <AccordionOption
                  styleView={{marginBottom: 16, flexGrow: 1}}
                  styleText={{fontSize: 16, fontWeight: '700', flexGrow: 1}}
                  name='Inputs'
                  pressed={showStoryInputs}
                  onPress={() => setShowStoryInputs(!showStoryInputs)}/>
                {showStoryInputs && <StoryInputs/>}
                <AccordionOption
                  styleView={{marginBottom: 16, flexGrow: 1}}
                  styleText={{fontSize: 16, fontWeight: '700', flexGrow: 1}}
                  name='Códigos de líneas'
                  pressed={showStoryLineCodes}
                  onPress={() => setShowStoryLineCodes(!showStoryLineCodes)}/>
                {showStoryLineCodes && <StoryLineCodes/>}
                <AccordionOption
                  styleView={{marginBottom: 16, flexGrow: 1}}
                  styleText={{fontSize: 16, fontWeight: '700', flexGrow: 1}}
                  name='Cards'
                  pressed={showStoryCards}
                  onPress={() => setShowStoryCards(!showStoryCards)}/>
                {showStoryCards && <StoryCards/>}
                <AccordionOption
                  styleView={{marginBottom: 16, flexGrow: 1}}
                  styleText={{fontSize: 16, fontWeight: '700', flexGrow: 1}}
                  name='Date Selector'
                  pressed={showDateSelector}
                  onPress={() => setShowDateSelector(!showDateSelector)}/>
                {showDateSelector && <StoryDateSelector/>}
                <AccordionOption
                  styleView={{marginBottom: 16, flexGrow: 1}}
                  styleText={{fontSize: 16, fontWeight: '700', flexGrow: 1}}
                  name='Alertas'
                  pressed={showAlertCard}
                  onPress={() => setShowAlertCard(!showAlertCard)}/>
                {showAlertCard && <StoryAlertCard/>}
            </ScrollView>
        {contextualInfo.warningMessage && <WarningSnackBar onPress={() => dispatch(contextualSlice.actions.updateWarningMessage(''))}/>}
        {contextualInfo.infoMessage && <InfoSnackBar onPress={() => dispatch(contextualSlice.actions.updateInfoMessage(''))}/>}
        {contextualInfo.sucessMessage && <SuccessSnackBar onPress={() => dispatch(contextualSlice.actions.updateSucessMessage(''))}/>}
        {contextualInfo.errorMessage && <ErrorSnackBar onPress={() => dispatch(contextualSlice.actions.updateErrorMessage(''))}/>}
    </SafeAreaView>
  )
}
