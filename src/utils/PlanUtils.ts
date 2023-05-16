import { IMarker } from '@src/types/interfaces';
import { TypeMarker } from '../types/ExploreInterfaces';
import { ILeg } from '@src/types/PlannerInterfaces';

export default class PlanUtils {

  /* Función que devuelve si la localización pasada se encuentra lejana al centro del mapa */
  static checkLocation(location: any) {
    if (!location) {
      return false;
    }
    const centerMap = { latitude: 43.030244, longitude: -2.593833 };
    if (
      Math.abs(Math.abs(location.longitude) - Math.abs(centerMap.longitude)) > 1.39 ||
      Math.abs(Math.abs(location.latitude) - Math.abs(centerMap.latitude)) > 0.8
    ) {
      return false;
    }
    return true;
  }

  /**
   * @function getTypeId sirve para obtener el id del tipo de lugar
   */
  static getTypeId(typePlace: TypeMarker, isFavorite?: boolean) {
    let typeId: number = 2;
    if (isFavorite) {
      return typeId;
    }

    if (typePlace === TypeMarker.Stop || typePlace === TypeMarker.Intercambiador) {
      return 0;
    } else if (typePlace === TypeMarker.Direction) {
      return 3;
    } else if (typePlace === TypeMarker.Poi) {
      return 1;
    }
    
    return typeId;
  }

  /**
   * @function allSegmentsHaveValues controla si todos los segmentos del planificador presentan un valor
   */
  static allSegmentsHaveValues(segments: Array<any>) {
    let haveValues = true;
    let i = 0;
    while (i < segments.length && haveValues) {
      if (!segments[i]) {
        haveValues = false;
      }
      i = i + 1;
    }
    return haveValues;
  }

  /**
   * @function cleanJoinPlan elimina del resultado de planificación @param res con los itinerarios
   * juntados aquellos itinerarios que se hayan señalado como incorrectos
   */
  static cleanJoinPlan(res: any, indexesToDelete: Array<number>) {
    indexesToDelete.sort(function (a, b) {
      return a - b;
    });

    for (let i = indexesToDelete.length - 1; i >= 0; i--) {
      res.plan.itineraries.splice(indexesToDelete[i], 1);
    }
    return res;
  }

  /**
   *
   */

  static getTransportModesToPlan(modesSelected: Array<number>) {
    let planMode = 'WALK';
    if (modesSelected.length === 0) {
      planMode += ',TRANSIT';
    } else {
      for (const mode of modesSelected) {
        if (mode === 2) {
          planMode += ',BUS';
        } else if (mode === 29) {
          planMode += ',BUS';
        } else if (mode === 4) {
          planMode += ',SUBWAY';
        } else if (mode === 90) {
          planMode += ',BYCICLE';
        } else if (mode === 1) {
          planMode += ',RAIL';
        } else if (mode === 5) {
          planMode += ',TRAM';
        } else {
          planMode += ',TRANSIT';
        }
      }
    }

    return planMode;
  }

  static isPublicMode(mode?: string) {
    if (
      mode === 'BUS' ||
      mode === 'SUBWAY' ||
      mode === 'TRANSIT' ||
      mode === 'RAIL' ||
      mode === 'SUBWAY' ||
      mode === 'TRAM' ||
      mode === 'FUNICULAR' ||
      mode === 'CABLE_CAR'
    ) {
      return true;
    }
    return false;
  }

  static organizeLengthOfLegsPublic(legs?: Array<ILeg>, originalLegs?: Array<ILeg>) {
    let styleMin = {
      flexGrow: 1,
      minWidth: 69,
    }

    if (!legs || !originalLegs || legs.length === 0) {
      return undefined;
    }

    let orderByDuration = legs.sort(function(itemA, itemB) {
      return itemA.duration - itemB.duration
    });

    let initialValue = 0.0
    let totalDuration = legs.reduce(
      (accumulator, currentValue) => accumulator + currentValue.duration,
      initialValue
    )

    orderByDuration[0].styleNew = styleMin;
    let originalFirstLeg = originalLegs.find((legOri: ILeg) => String(legOri?.id) === String(orderByDuration[0]?.id))
    if (originalFirstLeg) {
      originalFirstLeg.styleNew = styleMin;
    }

    for (let i = 1; i < orderByDuration?.length && orderByDuration?.length > 1; i++) {
      let originalLeg = originalLegs.find((legOri: ILeg) => String(legOri?.id) === String(orderByDuration[i]?.id))
      console.log('Original', originalLeg);
      
       if (orderByDuration[i].duration - orderByDuration[i - 1].duration > 9) {
         orderByDuration[i].styleNew = {
            flexGrow: orderByDuration[i - 1].styleNew.flexGrow + 1,
            minWidth: orderByDuration[i - 1].styleNew.minWidth + 24,
         }
       } else {
          orderByDuration[i].styleNew = JSON.parse(JSON.stringify(orderByDuration[i - 1].styleNew));
       }
       //modificamos el original
       if (originalLeg) {
        originalLeg.styleNew = orderByDuration[i].styleNew;
       }
    }

    return originalLegs;
  }
}
