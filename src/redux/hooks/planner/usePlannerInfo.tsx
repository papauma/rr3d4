import { usePlanMutation } from '@src/redux/services/plannerService';
import { contextualSlice } from '@src/redux/slices/contextualSlice';
import { plannerSegmentsInformation } from '@src/redux/slices/plannerSegmentsSlice';
import { plannerInformation, plannerSlice } from '@src/redux/slices/plannerSlice';
import { plannerTimerInformation } from '@src/redux/slices/plannerTimerSlice';
import { stopsState } from '@src/redux/slices/stopsSlices';
import { userState } from '@src/redux/slices/userSlice';
import { TypeMarker } from '@src/types/ExploreInterfaces';
import { TypeRouteFilter } from '@src/types/PlannerInterfaces';
import PlanUtils from '@src/utils/PlanUtils';
import TimeUtils from '@src/utils/TimeUtils';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function usePlannerInfo() {
  const dispatch = useDispatch()
  const [getPlan] = usePlanMutation();
  const plannerTimer: any = useSelector(plannerTimerInformation);
  const account: any = useSelector(userState);
  const segments: Array<any> = useSelector(plannerSegmentsInformation);
  const plannerInfo = useSelector(plannerInformation);
  const allStops = useSelector(stopsState);

  /**
   * @function checkPlannerPreferences comprueba que elementos de los filtros del
   * planificador se encuentran modficados
   */
  function checkPlannerPreferences(
    accesibilityChanged: boolean,
    routeType: TypeRouteFilter,
    operatorsSelectedChanged: any,
  ) {
    let preferencesChanged: number = 0;
    if (accesibilityChanged) {
      preferencesChanged += 1;
    }

    if (routeType !== TypeRouteFilter.FAST) {
        preferencesChanged += 1;
    }

    preferencesChanged += operatorsSelectedChanged !== null && operatorsSelectedChanged !== undefined ?  operatorsSelectedChanged.length : 0;

    return preferencesChanged;
  }

  /**
   * @function onPlannerSegmentChange devuelve una planificación a partir de la
   * cumplimentación de todos los parámetros
   */
  async function onPlannerSegmentChange(onResult?: Function) {
    dispatch(plannerSlice.actions.updatePlanResult(undefined));
    dispatch(plannerSlice.actions.updateSelectedPlan(0));
    if (segments[0] && segments[1] && Object.keys(segments).length === 2) {
      //en caso de no tener paradas intermedias
      dispatch(contextualSlice.actions.updateShowLoading(true));
      let dest =
        segments[segments.length - 1]?.position.latitude +
        ',' +
        segments[segments.length - 1]?.position.longitude;
      let ori = segments[0]?.position.latitude + ',' + segments[0]?.position.longitude;
      const resultPlan: any = await getPlan({
        origin: ori,
        destination: dest,
        time: plannerTimer.now
          ? TimeUtils.getTimePM_AM(TimeUtils.getTime(Date.now()))
          : plannerTimer.time,
        date: plannerTimer.date,
        wheelchair: plannerInfo.accessibilityFilter,
        maxWalkDistance: plannerInfo.walkDistance,
        arriveBy: plannerTimer.arriveBy,
        deviceType: account.deviceTypeId,
        intermediateStops: '',
        intermediatePlacesId: '',
        transportModes: PlanUtils.getTransportModesToPlan(plannerInfo.operatorFilters),
        toPlaceTypeId: PlanUtils.getTypeId(segments[segments.length - 1]?.markerType),
        toPlaceValue: segments[segments.length - 1]?.markerType === TypeMarker.Direction ? segments[segments.length - 1]?.data?.name : String(segments[segments.length - 1]?.id),
        fromPlaceTypeId: PlanUtils.getTypeId(segments[0]?.markerType),
        fromPlaceValue: segments[0]?.markerType === TypeMarker.Direction ? segments[0]?.data?.name : String(segments[0]?.id),
      });
        //await analytics().logEvent('planObtenido');
      //TO CHANGE
      if (resultPlan.data && /* resultPlan?.data[0]?.plan */ resultPlan?.data?.plan) {
        dispatch(plannerSlice.actions.updatePlanResult(resultPlan?.data));
        dispatch(plannerSlice.actions.updateSelectedPlan(0));
        onResult?.(resultPlan.data);
      }

      if (resultPlan?.error || !resultPlan?.data?.plan /* resultPlan?.data[0]?.error */) {
        if (resultPlan?.error?.status === 'FETCH_ERROR') {
          dispatch(contextualSlice.actions.updateErrorMessage('Error en la conexión'));
        } else {
          dispatch(contextualSlice.actions.updateErrorMessage('Ruta no disponible'));
        }
      }
      dispatch(contextualSlice.actions.updateShowLoading(false));
    } else {
      dispatch(plannerSlice.actions.updatePlanResult(null));
      dispatch(contextualSlice.actions.updateShowLoading(false));
    }
  }

  /**
   * @function allSegmentsHaveValue controla que todos los segmentos de ruta
   * son distinto de null
   */
  function allSegmentsHaveValue() {
    return segments.filter((segment: IMarker | null) => segment?.id)?.length === segments.length;
  }

  return {
    checkPlannerPreferences,
    onPlannerSegmentChange,
    allSegmentsHaveValue,
  }
}
