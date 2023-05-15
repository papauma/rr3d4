import CenteredModal from '@src/components/commons/modal/CenteredModal';
import CustomCalendar from '@src/components/widgets/CustomCalendar';
import { useTranslate } from '@src/context/languageContext';
import React, { useState } from 'react';

interface CalendarSelectionModalProps {
  showModal: boolean;
  setShowModal: Function;
  selectionDate?: Function;
  accessibilityHint?: string;
}

export default function CalendarSelectionModal(props: CalendarSelectionModalProps) {
  const [selectedDay, setSelectedDay] = useState();
  const t = useTranslate()

  function onSaveChanges() {
    props.selectionDate?.(selectedDay);
    props.setShowModal();
  }

  return (
    <CenteredModal
      visible={props.showModal}
      setViewModal={props.setShowModal}
      showCloseButton={true}
      button1={t('button_save')}
      disabledButton1={!selectedDay}
      //button2='Cancelar'
      onPressButton1={onSaveChanges}
      modalViewStyle={{borderRadius: 16}}
      //onPressButton2={props.setShowModal}
    >
      <CustomCalendar accessibilityHint={props.accessibilityHint} setCurrentDate={setSelectedDay} />
    </CenteredModal>
  );
}
