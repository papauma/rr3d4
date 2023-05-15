import CenteredModal from '@src/components/commons/modal/CenteredModal';
import Label from '@src/components/commons/text/Label';
import HoursWheel from '@src/components/widgets/HoursWheel';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import React, { useState } from 'react';
import { View } from 'react-native';

interface HourSelectionModalProps {
  showModal: boolean;
  setShowModal: Function;
  selectionHour?: Function; //callback tras guardar la hora
  arriveBy?: boolean;
}

export default function HourSelectionModal(props: HourSelectionModalProps) {
  const [hourSelected, setHourSelected] = useState({ minute: null, hour: null });
  const t = useTranslate();
  const theme = useTheme()

  function onSaveChanges() {
    props.selectionHour?.(hourSelected);
    props.setShowModal();
  }

  return (
    <CenteredModal
      visible={props.showModal}
      setViewModal={props.setShowModal}
      button1={t('button_done')}
      onPressButton1={onSaveChanges}
      onPressButton2={props.setShowModal}
      disabledButton1={
        typeof hourSelected?.minute !== 'number' || typeof hourSelected?.hour !== 'number'
      }
      button2={t('button_cancel')}
      modalViewStyle={{borderRadius: 12,}}
    >
      <View style={{ paddingHorizontal: 61.5 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 30,
            paddingVertical: 5.5,
            backgroundColor: theme.colors.gray_200,
            borderRadius: 12,
            //borderBottomColor: R.resources.colors.primary.primary_500,
          }}
        >
          <Label style={{ fontSize: 16, fontWeight: '700', lineHeight: 20.8, }}>{props.arriveBy ? t('timer_arrival') : t('timer_departure')}</Label>
        </View>
        <HoursWheel callback={(time: any) => setHourSelected({ ...hourSelected, ...time })} />
      </View>
    </CenteredModal>
  );
}
