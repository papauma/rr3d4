import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IPlanResult, TypeRouteFilter } from '@src/types/PlannerInterfaces';

export interface PlannerInformation {
  plannerResult: IPlanResult | null; //resultado de planificación
  accessibilityFilter: boolean; //filtro accesibilidad
  routeTypeFilter: TypeRouteFilter; //filtro ruta ma rapida, menos transbordo...
  walkDistance: number; //distancia máxima andando
  selectedPlan: number; //plan seleccionado
  operatorFilters: Array<number>; //operadores seleccionados como preferencias
}

const initialState = {
  PlannerInformation: {
    plannerResult: null,
    accessibilityFilter: false,
    routeTypeFilter: TypeRouteFilter.FAST,
    selectedPlan: 0,
    operatorFilters: [],
    walkDistance: null,
  },
};

export const plannerSlice = createSlice({
  name: 'plannerSlice',
  initialState,
  reducers: {
    updatePlanResult: (state, action) => {
      state.PlannerInformation.plannerResult = action.payload;
    },
    updateAccesibility: (state, action) => {
      state.PlannerInformation.accessibilityFilter = action.payload;
    },
    updateRouteType: (state, action) => {
      state.PlannerInformation.routeTypeFilter = action.payload;
    },
    updateSelectedPlan: (state, action) => {
      state.PlannerInformation.selectedPlan = action.payload;
    },
    updateWalkDistance: (state, action) => {
      state.PlannerInformation.walkDistance = action.payload;
    },
    updateOperators: (state, action) => {
      state.PlannerInformation.operatorFilters = action.payload;
    },
    resetAllPreferences: (state) => {
      /* TODO: Esto hay que refactorizarlo, si algún día se añaden nuevos filtros hay que actualizar estre reset
               Esto ocurre porque no se diferencia entre la planificación y las preferencias. Se debería extraer estas últimas
      */
      state.PlannerInformation.operatorFilters = initialState.PlannerInformation.operatorFilters;
      state.PlannerInformation.accessibilityFilter = initialState.PlannerInformation.accessibilityFilter;
      state.PlannerInformation.walkDistance = initialState.PlannerInformation.walkDistance;
      state.PlannerInformation.selectedPlan = initialState.PlannerInformation.selectedPlan;

    }

  },
});

export const plannerInformation = (state: RootState) => state.plannerSlice.PlannerInformation;
