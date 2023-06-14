import { useLazyGetLineDirectionsQuery, useLazyGetLineShapeTripQuery, useLazyGetLinesBothTypesStopsQuery, useLazyGetLinesBothTypesStopsTripQuery } from '@src/redux/services/linesService';
import { contextualSlice } from '@src/redux/slices/contextualSlice';
import { lineInfoState, lineInfoStopIdState, updateMarkersInfoLine, updatePolylinesInfoline, updateStopSelectedId } from '@src/redux/slices/lineInfoSlice';
import { lineState } from '@src/redux/slices/linesSlices';
import { transportModeState } from '@src/redux/slices/transportmodeSlices';
import { ILine } from '@src/types/ExploreInterfaces';
import { ITransportMode } from '@src/types/interfaces';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const especialOrderTransportId = { 3: 0, 10: 1, 7: 2, 1: 3, 2: 4, 90: 5 };

export function preparePolyLine(
  id: string | number,
  colorRuta: string,
  weight: number,
  arrayPositions: Array<any>,
) {
  const pathOptions = {

    lineJoin: 'round',
    strokeColor: colorRuta,
    strokeWidth: weight,
    zIndex: 20,
    lineDashPattern: null,
    //lineJoin: 'round',
  };
  const polylinesLine = {
    id: id,
    path: arrayPositions.map((result) => {
      return {
        latitude: parseFloat(result.latitude),
        longitude: parseFloat(result.longitude),
      };
  }),
    properties: pathOptions,
  };
  return polylinesLine;
}

const useInfoLinea = () => {
  const [GetLineShapeTrip] = useLazyGetLineShapeTripQuery();
  const [GetLineDirections] = useLazyGetLineDirectionsQuery();
   const [GetLineStopwithTrip] = useLazyGetLinesBothTypesStopsTripQuery();
  const [GetLineStop] = useLazyGetLinesBothTypesStopsQuery();

  const selectorLines = useSelector(lineState);
  const selectorTransportMode = useSelector(transportModeState);
  const lineSelector = useSelector(lineInfoState);
  const stopOfLineSelected = useSelector(lineInfoStopIdState);


  const [sentidoOptions, setSentidoOptions] = useState([]);
  const [direction, setDirection] = useState('');
  const [infoLine, setInfoLine] = useState() as any;
  const [lineData, setLineData] = useState([]);
  const [trip, setTrip] = useState(null);
  const [directionId, setDirectionId] = useState(0);
  const dispatch = useDispatch();

  const changeTrip = (value) => {
    setTrip(value);
    setDirection('');
    setLineData([]);
    setDirectionId(0);
  };

  const getLineInfo = () => {
    const linea = selectorLines.find((line: ILine) => String(line.id) === String(lineSelector.id));
    if (!linea) {return;}
    const transportMode = linea.transportmode;
    const icon = selectorTransportMode.find((transport: ITransportMode) => transport.id === transportMode)?.iconId;
    return { ...linea, iconId: icon };
  };

  const paintInfoLinea = (infoline, datosShape, stops) => {
    console.log('paintInfoLinea');
    const polylinesLine = preparePolyLine(infoline.id, '#' + (infoline.routeColor !== 'FFFFFF' ? infoline.routeColor : '000000'), 4, datosShape);
    if ([7].includes(infoline.transportmode)) {
      const polylinesLineBorde = preparePolyLine('borde_' + infoline.id, '#FFFFFF', 1, datosShape);
      dispatch(updatePolylinesInfoline([polylinesLine, polylinesLineBorde]));

    } else {
      dispatch(updatePolylinesInfoline([polylinesLine]));
    }

    const markersStops = stops.map( (stop, index) => {
      return {
        id: stop.id,
        position: { lat:stop.stopLat, lng:stop.stopLon },
        data: { name: stop.stopName.toLowerCase(), routeColor: infoline.routeColor },
        type: 'CIRCLESTOP',
      };
    });

    dispatch(updateMarkersInfoLine([...markersStops]));
    dispatch(contextualSlice.actions.updateShowLoadingBackground(false));
  };

  useEffect(() => {
    async function getFromAPi() {
      if (lineSelector.id) {
        dispatch(contextualSlice.actions.updateShowLoadingBackground(true));
        const informacionLinea = getLineInfo();
        if (!informacionLinea) {
          dispatch(contextualSlice.actions.updateShowLoadingBackground(false));
          return;
        }
        setInfoLine(informacionLinea);
  
        await GetLineShapeTrip({ id: lineSelector.id }).then(async (response) => {
          if (response.data.length > 0) {
            const nextTripId = lineSelector.tripId ? lineSelector.tripId : response.data[0].id;
  
            await GetLineDirections(lineSelector.id).then((lineDirections) => {
              const directions = lineDirections.data;
              const optionDirection = directions.map((direccion: any) => ({
                txt: direccion.headSign.toLowerCase(),
                value: direccion.tripId,
                directionId: direccion.directionId,
                selected: direccion.tripId === nextTripId,
              }));
              let direccionActual = directions.find((direccion: any) => direccion.tripId === nextTripId);
              if (!direccionActual) {
                direccionActual = directions.find((direccion: any) => direccion.tripId === response.data[0].id)
              }

              if (direccionActual) {
                setDirection(direccionActual.headSign.toLowerCase());
                setDirectionId(direccionActual.directionId);
                setSentidoOptions(optionDirection);
              }
            });
            
            if (nextTripId !== null) {
              await GetLineStopwithTrip({ id: lineSelector.id, tripId: nextTripId }).then((lineStops) => {
                if (lineStops.data) {
                  let foundStopInLine = lineStops.data.find((element: any) => String(element.id) === String(stopOfLineSelected));
                  if (!foundStopInLine) {
                    dispatch(updateStopSelectedId(lineStops.data[0].id));
                  }
                }
                const paradas = JSON.parse(JSON.stringify(lineStops.data));
                setLineData(paradas);
                paintInfoLinea(informacionLinea, response.data, lineStops.data);
              });
            } else {
              await GetLineStop(lineSelector.id).then((lineStops) => {
                if (lineStops.data) {
                  let foundStopInLine = lineStops.data.find((element: any) => String(element.id) === String(stopOfLineSelected));
                  if (!foundStopInLine) {
                    dispatch(updateStopSelectedId(lineStops.data[0].id));
                  }
                }
                const paradas = JSON.parse(JSON.stringify(lineStops.data));
                setLineData(paradas);
                paintInfoLinea(informacionLinea, response.data, lineStops.data);
              });
            }
            dispatch(contextualSlice.actions.updateShowLoadingBackground(false));
          } else {
            //dispatch(contextualSlice.actions.updateErrorMessage('No se ha encontrado información sobre la línea'));
            dispatch(contextualSlice.actions.updateShowLoadingBackground(false));
          }
        })
        .catch((e) => {console.log(e); dispatch(contextualSlice.actions.updateShowLoadingBackground(false));});
      }
    }

    getFromAPi()
  }, [lineSelector.id, lineSelector.tripId, dispatch, selectorLines]);

  return { infoLine , lineData, trip, direction, sentidoOptions, changeTrip, setLineData, directionId };
};
export default useInfoLinea;
