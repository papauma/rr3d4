import { IDataMarker, SearchStopType, TypeMarker } from "@src/types/ExploreInterfaces";

export function formatStopMarkers(stops: any, dataOriginAg: any, updateStops: Function) {

    stops = stops.filter((stop: any) => {
      if (stop.stopGtfsId.includes('est_90')) {
        return false;
      } else {
        return true;
      }
    });
  
    updateStops(stops.map((stop: SearchStopType) => {
  
        const dataOrigin = dataOriginAg.find(
          (itemDataOrigin: any) => itemDataOrigin.id === stop.agencyOriginId,
        );
  
        // Recoger aleatoriamente el primer elemento por ahora
        //console.log();
        let foundTransportModeIndex: number = dataOrigin?.transportModes?.findIndex(
          (transportOrigin: any) =>
            String(transportOrigin.transportModeId) === String(stop.stopTransportMode),
        );
  
        let icons = null;
        if (foundTransportModeIndex !== -1) {
          icons = dataOrigin?.transportModes[foundTransportModeIndex];
        } else {
          icons = dataOrigin?.transportModes[0];
        }
  
        let markerData: IDataMarker = {
          name: stop.stopName,
          address: stop.stopDesc,
          agencyOriginId: stop?.agencyOriginId,
          transportMode: stop?.stopTransportMode,
          code: stop?.stopCode,
          icons: icons,
        };
  
        return {
          id: stop.id,
          stopCode: stop.stopCode,
          position: { latitude: stop.stopLat, longitude: stop.stopLon },
          data: markerData,
          markerType: TypeMarker.Stop,
        };
      }),
    );
  }