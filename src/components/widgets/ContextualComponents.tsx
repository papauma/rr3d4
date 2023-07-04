import { contextualInformation } from '@src/redux/slices/contextualSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import BackgroundModal from '../commons/modal/BackgroundModal';
import Loading from '../commons/loading/Loading';

export default function ContextualComponents({children}: {children: any}) {
  const contextualInfo = useSelector(contextualInformation); 

  return (
    <>
        {contextualInfo.showBackground && <BackgroundModal/>}
        {contextualInfo.showLoading && <Loading />}
        {children}
    </>
  )
}
