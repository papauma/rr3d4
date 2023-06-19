import AlertCollapsableCard from '@src/components/commons/accordion/AlertCollapsableCard';
import { useLazyGetAlertsQuery } from '@src/redux/services/alertService';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';


interface StopAlertsInfoProps {
  stopId?: number;
}

export default function StopAlertsInfo(props: StopAlertsInfoProps) {
  const [getAlerts] = useLazyGetAlertsQuery();
  const [alertsOfStop, setAlertsOfStop] = useState([]);

  useEffect(() => {
    async function getAlertsOfStop() {
      await getAlerts().then(alertas => {
        if (alertas.isSuccess) {
          if (alertas.data.length > 0) {
            let filteredAlerts = alertas.data.filter((alert: any) =>
              alert.paradas.find(
                parada => String(parada.idParada) === String(props.stopId),
              ),
            );
            setAlertsOfStop(filteredAlerts);
          }
        }
      });
    }

    props.stopId && getAlertsOfStop();
  }, [getAlerts, props.stopId]);

  return props.stopId ? (
    <View style={{padding: 16, paddingBottom: 0, flex: 0.5}}>
      {alertsOfStop.map((alert: any, index: number) => {
        return (
          <AlertCollapsableCard
            key={alert.idAlerta}
            title={alert?.titulo}
            startTime={alert?.fechas[0]}
            description={alert?.descripcion}
            linkPdf={alert?.url}
            style={index !== 0 ? {marginTop: 8} : null}
          />
        );
      })}
    </View>
  ) : null;
}
