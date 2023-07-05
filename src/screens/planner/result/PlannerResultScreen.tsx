import ErrorSnackBar from '@src/components/commons/feedback/ErrorSnackBar';
import Loading from '@src/components/commons/loading/Loading';
import BackgroundModal from '@src/components/commons/modal/BackgroundModal';
import PlannerHeader from '@src/components/features/planner/definition/organisms/PlannerHeader';
import RouteCardsGroup from '@src/components/features/planner/result/organisms/RouteCardsGroup';
import usePlannerInfo from '@src/redux/hooks/planner/usePlannerInfo';
import {
  contextualInformation,
  contextualSlice,
} from '@src/redux/slices/contextualSlice';
import {plannerSegmentsInformation} from '@src/redux/slices/plannerSegmentsSlice';
import {plannerInformation, plannerSlice} from '@src/redux/slices/plannerSlice';
import {plannerTimerInformation} from '@src/redux/slices/plannerTimerSlice';
import {TypeRouteFilter} from '@src/types/PlannerInterfaces';
import RouteUtils from '@src/utils/RouteUtils';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

interface PlannerResultScreenProps {
  plan?: any;
}

export default function PlannerResultScreen(props: PlannerResultScreenProps) {
  const contextual = useSelector(contextualInformation);
  const dispatch = useDispatch();

  const plannerInfo = useSelector(plannerInformation);
  const plannerTimerInfo = useSelector(plannerTimerInformation);
  const [receivedFirstPlan, setReceivedFirstPlan] = useState(props.plan);
  const segments = useSelector(plannerSegmentsInformation);
  const routeTypeFilter = plannerInfo.routeTypeFilter;
  const {allSegmentsHaveValue, onPlannerSegmentChange} = usePlannerInfo();

  let parsedPlanByUtils = RouteUtils.getRoutesInfo(
    plannerInfo.plannerResult,
    segments,
  );
  let parsedPlan = RouteUtils.sortRoutes(
    JSON.parse(JSON.stringify(parsedPlanByUtils)),
    routeTypeFilter === TypeRouteFilter.FAST
      ? 'duration'
      : routeTypeFilter === TypeRouteFilter.TRANSFER
      ? 'transhipments'
      : 'walkDistance',
    'asc',
  );

  let sortedPlanFast = RouteUtils.sortRoutes(
    JSON.parse(JSON.stringify(parsedPlanByUtils)),
    'duration',
    'asc',
  );
  let sortedPlanTransfer = RouteUtils.sortRoutes(
    JSON.parse(JSON.stringify(parsedPlanByUtils)),
    'transhipments',
    'asc',
  );
  let sortedPlanWalk = RouteUtils.sortRoutes(
    JSON.parse(JSON.stringify(parsedPlanByUtils)),
    'walkDistance',
    'asc',
  );

  /**
   * Se planifica si se presentan valores en todos los segmentos de ruta,
   * o si se han modificado los tiempos del planificador
   */
  useEffect(() => {
    if (!receivedFirstPlan) {
      if (segments && allSegmentsHaveValue()) {
        onPlannerSegmentChange();
      } else {
        dispatch(plannerSlice.actions.updatePlanResult(null));
      }
    } else {
      setReceivedFirstPlan(null);
    }
  }, [
    segments,
    plannerTimerInfo.arriveBy,
    plannerTimerInfo.date,
    plannerTimerInfo.intermediateStopTimes,
    plannerTimerInfo.now,
    plannerTimerInfo.time,
    plannerInfo.walkDistance,
    plannerInfo.operatorFilters,
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <PlannerHeader showFavoriteButton={true} />
      {contextual.errorMessage && (
        <ErrorSnackBar
          message={contextual.errorMessage}
          onPress={() =>
            dispatch(contextualSlice.actions.updateErrorMessage(''))
          }
        />
      )}
      {contextual.showLoading ? (
        <View />
      ) : (
        <View style={{padding: 16, flex: 1}}>
          <RouteCardsGroup
            plan={parsedPlan}
            sortedPlanFast={sortedPlanFast}
            sortedPlanTransfer={sortedPlanTransfer}
            sortedPlanWalk={sortedPlanWalk}
          />
        </View>
      )}
    </SafeAreaView>
  );
}
