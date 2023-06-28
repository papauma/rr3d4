import BottomSheetContent from '@src/components/commons/bottomSheet/BottomSheetContent';
import {
  mapStateMarkerSelected,
  updateMarkerSelected,
} from '@src/redux/slices/mapSlice';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import MarkerDetails from './MarkerDetails';
import InfoMapUtils from '@src/utils/InfoMapUtils';
import {IBounds, ILocation} from '@src/types/interfaces';
import {Dimensions} from 'react-native';
import StopsNearCenter from '@src/components/features/stopsNear/StopsNearCenter';
import GeoUtils from '@src/utils/GeoUtils';

export default function HomeBottomSheet({center, zoom, bounds}: {center: ILocation | null; zoom: number; bounds: IBounds | null}) {
  const dispatch = useDispatch();
  const markerSelected = useSelector(mapStateMarkerSelected);
  const [topContentBottomSheet, setTopContentBottomSheet] = useState();
  const [loadingCenter, setLoadingCenter] = useState(false);
  const [definitiveCenter, setDefinitiveCenter] = useState<
    ILocation | undefined
  >();
  const previousCenterRef = useRef();

  const snapPoints = useMemo(() => {
    if (!markerSelected && definitiveCenter) {
      return [15, 90, 520];
    }

    return InfoMapUtils.getSnapPoint(markerSelected?.markerType);
  }, [markerSelected, definitiveCenter]);

  useEffect(() => {
    setTopContentBottomSheet(undefined);
  }, [markerSelected]);

  /**
   * Lógica paradas cercanas ante la actualización del centro del mapa
   */
  useEffect(() => {
    let timer: number;
    if (!markerSelected && center) {
      const checkState = () => {
        console.log('prev', previousCenterRef.current);
        console.log('Def', definitiveCenter);
        
        if (center === previousCenterRef.current) {
          // El valor de la variable se ha mantenido 5 segundos
          if (!previousCenterRef.current && !definitiveCenter) {
            //se actualiza el centro en caso de que la distancia con respecto al anterior valor sea mayor a 25 metros
            let distance = GeoUtils.calculateDistanceBetweenTwoPoins(
              center.latitude,
              center.longitude,
              definitiveCenter.latitude,
              definitiveCenter.longitude,
            );

            if (distance >= 25) {
              setDefinitiveCenter(center);
            }
          } else {
            setDefinitiveCenter(center);
          }
        } else if (!definitiveCenter) {
          setDefinitiveCenter(center);
        } else {
        }
        setLoadingCenter(false);
      };

      const resetTimer = () => {
        clearTimeout(timer);
        setLoadingCenter(true);
        timer = setTimeout(checkState, 5000);
      };

      resetTimer();
    }

    return () => {
      clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
    };
  }, [center, markerSelected]);

  useEffect(() => {
    previousCenterRef.current = center; // Actualizar el valor anterior de la variable de estado
  }, [center]);

  return (
    <BottomSheetContent
      initial={0}
      snapPoints={snapPoints}
      onChange={index => {
        if (index < 0) {
          dispatch(updateMarkerSelected(null));
          setDefinitiveCenter(undefined);
        }
      }}
      enablePanDownToClose={true}
      topContent={topContentBottomSheet}>
      {markerSelected && (
        <MarkerDetails
          markerSelected={markerSelected}
          setTopContentBottomSheet={setTopContentBottomSheet}
        />
      )}
      {bounds && definitiveCenter && !markerSelected && zoom > 17.5 && (
        <StopsNearCenter
          center={definitiveCenter}
          region={bounds}
          loadingCenter={loadingCenter}
        />
      )}
    </BottomSheetContent>
  );
}
