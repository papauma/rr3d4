import { contextualInformation } from '@src/redux/slices/contextualSlice';
import React from 'react';
import { useSelector } from 'react-redux';
//import BackgroundModal from '../commons/modal/BackgroundModal';
import ContextualMessage from '../commons/contextualMessage/ContextualMessage';
import Loading from '../commons/loading/Loading';

export default function ContextualComponents() {
  const contextualInfo = useSelector(contextualInformation);

  return (
    <>
        {contextualInfo.errorMessage && <ContextualMessage result="KO" text={contextualInfo.errorMessage}/> }
        {contextualInfo.successMessage && <ContextualMessage result="OK" text={contextualInfo.successMessage}/> }
        {contextualInfo.showLoading && <Loading />}
    </>
  );
}
