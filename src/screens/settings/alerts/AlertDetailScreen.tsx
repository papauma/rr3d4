import ScreenTitle from '@src/components/commons/text/ScreenTitle';
import AlertInfo from '@src/components/features/alerts/molecules/AlertInfo';
import { useTranslate } from '@src/context/languageContext';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';

interface AlertDetailScreenProps {
  alertId: number;
}

export default function AlertDetailScreen(props: AlertDetailScreenProps) {
  const [alertInfo, setAlertInfo] = useState();
  const t = useTranslate()

  useEffect(() => {}, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenTitle 
        title={t('notices')}
      />
      <View style={{flex: 1}}>
        <ScrollView>
          {alertInfo && (
            <AlertInfo
              alertId={alertInfo.idAlerta}
              title={alertInfo?.titulo}
              lines={alertInfo.lineas}
              stops={alertInfo?.paradas}
              startTime={alertInfo?.fechas[0]}
              isFavorite={false}
              isDetailed={true}
              description={alertInfo?.descripcion}
              linkPdf={alertInfo?.url}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
