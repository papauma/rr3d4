import ErrorSnackBar from '@src/components/commons/feedback/ErrorSnackBar'
import PlannerHeader from '@src/components/features/planner/definition/organisms/PlannerHeader'
import { contextualInformation, contextualSlice } from '@src/redux/slices/contextualSlice'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

export default function PlannerResultScreen(props: any) {
  const contextual = useSelector(contextualInformation);
  const dispatch = useDispatch()

  return (
    <SafeAreaView style={{flex: 1}}>
        <PlannerHeader showFavoriteButton={true}/>
        {contextual.errorMessage && 
        (<ErrorSnackBar message={contextual.errorMessage} 
              onPress={() => dispatch(contextualSlice.actions.updateErrorMessage(''))}/>)}
    </SafeAreaView>
  )
}
