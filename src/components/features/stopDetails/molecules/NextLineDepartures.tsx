import Label from '@src/components/commons/text/Label';
import { ILine } from '@src/types/ExploreInterfaces';
import React, { useEffect, useState } from 'react'
import { View } from 'react-native';
import DepartureLineInfo from '../atoms/DepartureLineInfo';
import { useSelector } from 'react-redux';
import { lineState } from '@src/redux/slices/linesSlices';

interface NextLineDeparturesProps {
    lines?: Array<ILine>;
    allLineTimes?: Array<ILineTime>;
    onPressReset?: Function;
}

export default function NextLineDepartures(props: NextLineDeparturesProps) {
    const [infoLineas, setInfoLineas] = useState<any>(null);
    const allLinesInfo = useSelector(lineState)

    useEffect(() => {
        if (
          props !== null &&
          props !== undefined &&
          props.allLineTimes !== null &&
          props.allLineTimes !== undefined &&
          props.allLineTimes.length > 0
        ) {
          const lineas = obtainLinesInfo();
          setInfoLineas(lineas);
        }
      }, [props.allLineTimes]);

   //TO CHANGE
   function timeTilNow(fecha, hora) {
    let retorno = '';
    const ahora = new Date();
    const diaAhora = new Date(
      ahora.getFullYear() +
        '-' +
        parseInt(ahora.getMonth() + 1) +
        '-' +
        ahora.getDate() +
        'T' +
        ahora.getHours() +
        ':' +
        ahora.getMinutes() +
        ':00',
    );
    const [dia, mes, anyo] = fecha.split('/');
    const diaHora = new Date(anyo + '-' + mes + '-' + dia + 'T' + hora);
    const diferencia = (diaHora.getTime() - diaAhora.getTime()) / 1000 / 60;
    const horasDiff = parseInt(diferencia / 60);
    const minutos = diferencia - 60 * horasDiff;
    if (horasDiff > 0) {
      retorno += horasDiff + ' h';
    }
    if (parseInt(minutos) > 0) {
      retorno += retorno !== '' ? ' ' + parseInt(minutos) + ' min' : parseInt(minutos) + ' min';
    }
    return retorno;
  }
      

  //TO CHANGE    
  function obtainLinesInfo() {
    let lineas: any = [];
    let tiemposPorLinea = {};
    const today = new Date();
    const stringToday =
      String(today.getDate()).padStart(2, '0') +
      '/' +
      String(today.getMonth() + 1).padStart(2, '0') +
      '/' +
      String(today.getFullYear());
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const stringTomorrow =
      String(tomorrow.getDate()).padStart(2, '0') +
      '/' +
      String(tomorrow.getMonth() + 1).padStart(2, '0') +
      '/' +
      String(tomorrow.getFullYear());

    if (props.allLineTimes) {
        for (const lineTime of props.allLineTimes) {
            if (lineTime.fecha === stringToday || lineTime.fecha === stringTomorrow) {
              const timeToNow = timeTilNow(lineTime.fecha, lineTime.time);
              if (timeToNow !== '') {
                if (!lineas.includes(lineTime.lineId)) {
                  lineas.push(lineTime.lineId);
                  let direccion = {};
                  direccion[lineTime.headSign] = {};
                  direccion[lineTime.headSign].nameHead = lineTime.headSign;
                  direccion[lineTime.headSign].tiempos = [timeToNow];
                  const infoDefinLinea: ILine | undefined = allLinesInfo.find((elementLine: ILine) => elementLine.id === lineTime.lineId)
                  const lineasTiempo = {
                    id: lineTime.lineId,
                    name: infoDefinLinea?.name,
                    code: infoDefinLinea?.code,
                    routeColor: infoDefinLinea?.routeColor,
                    routeTextColor: infoDefinLinea?.routeTextColor,
                    direcciones: direccion,
                    transportMode: infoDefinLinea?.transportmode,
                  };
                  tiemposPorLinea[lineTime.lineId] = lineasTiempo;
                } else {
                  const lineaTiempo = tiemposPorLinea[lineTime.lineId];
                  if (lineaTiempo.direcciones[lineTime.headSign] === undefined) {
                    tiemposPorLinea[lineTime.lineId].direcciones[lineTime.headSign] = {
                      nameHead: lineTime.headSign,
                    };
                    tiemposPorLinea[lineTime.lineId].direcciones[lineTime.headSign].tiempos = [timeToNow];
                  } else {
                    if (lineaTiempo.direcciones[lineTime.headSign].tiempos.length < 3) {
                      tiemposPorLinea[lineTime.lineId].direcciones[lineTime.headSign].tiempos.push(
                        timeToNow,
                      );
                    }
                  }
                }
              }
            } else {
              break;
            }
          }
    }
    
    let retorno = {}
    for (let i = 0; i <lineas.length; i++) {
      retorno[i + '_' + lineas[i]] = tiemposPorLinea[lineas[i]]
    }
    return retorno;
   }

  return (
    <View style={{ flex: 1 }}>
      <View accessible={true} role={'listitem'} accessibilityLabel={'Lista de líneas que pasan por esa parada y sus tiempos de pasada'}>
        {infoLineas !== null && infoLineas !== undefined
          ? Object.keys(infoLineas).map((linea, index) => {
              console.log('Info-Linea:', infoLineas[linea]);
              return (
                <DepartureLineInfo
                  id={infoLineas[linea].id}
                  key={`${linea.id}-${index}`}
                  transportMode={infoLineas[linea]?.transportMode}
                  lineName={infoLineas[linea]?.name}
                  lineCode={infoLineas[linea]?.code}
                  routeColor={infoLineas[linea]?.routeColor}
                  routeTextColor={infoLineas[linea]?.routeTextColor}
                  lineTimes={infoLineas[linea]?.direcciones}
                  style={{marginTop: 8}}
                />
              );
            })
          : ''}
      </View>
    </View>
  )
}
