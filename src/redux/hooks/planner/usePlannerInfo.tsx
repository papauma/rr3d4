import { TypeRouteFilter } from '@src/types/PlannerInterfaces';
import React from 'react'

export default function usePlannerInfo() {
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

  return {
    checkPlannerPreferences
  }
}
