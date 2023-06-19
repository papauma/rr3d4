import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import AlertCollapsableCard from '@src/components/commons/accordion/AlertCollapsableCard';
import {useTheme} from '@src/context/themeContext';
import {useLazyGetAlertsQuery} from '@src/redux/services/alertService';
import {contextualSlice} from '@src/redux/slices/contextualSlice';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

export default function AlertsOfLineList({id}: {id: number}) {
  const [alerts, setAlerts] = useState([]);
  const [getAlerts] = useLazyGetAlertsQuery();
  const dispatch = useDispatch();
  const theme = useTheme();

  console.log('Id', id);

  useEffect(() => {
    async function getAlertsOfStop() {
      dispatch(contextualSlice.actions.updateShowLoading(true));
      getAlerts()
        .then(alertas => {
          if (alertas.isSuccess) {
            if (alertas.data.length > 0) {
              let filteredAlerts = alertas.data.filter((alert: any) =>
                alert.lineas.find(line => String(line.idLinea) === String(id)),
              );
              setAlerts(filteredAlerts);
            }
          }
        })
        .finally(() =>
          dispatch(contextualSlice.actions.updateShowLoading(false)),
        );
    }

    id && getAlertsOfStop();
  }, [getAlerts, id]);

  return (
    <View style={{flex: 1, backgroundColor: theme.colors.white}}>
      <BottomSheetScrollView>
        {alerts.map((alert: any) => (
          <AlertCollapsableCard
            key={alert.idAlerta}
            title={alert?.titulo}
            startTime={alert?.fechas[0]}
            description={alert?.descripcion}
            linkPdf={alert?.url}
            style={{marginBottom: 8}}
          />
        ))}
      </BottomSheetScrollView>
    </View>
  );
}
