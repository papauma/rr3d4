import { TypeMarker } from "@src/types/ExploreInterfaces";
import { IPosition } from "@src/types/interfaces";
import { Dimensions } from "react-native";

export default class InfoMapUtils {
    static getSnapPoint(markerType?: TypeMarker) {
        if (markerType === TypeMarker.Stop) {
            return [15, 223, Dimensions.get('window').height * 0.72];
        } else {
            return [5, 15]
        }
    }

    static parseSearchStopToMarker(stop: SearchStopType) {
        return {
          id: stop.id,
          data: {
            name: stop.stopName,
            address: stop.stopDesc,
            agencyOriginId: stop.agencyOriginId,
            transportMode: stop.stopTransportMode,
            code: stop.stopCode,
          },
          position: {
            latitude: parseFloat(stop.stopLat.toFixed(5)),
            longitude: parseFloat(stop.stopLon.toFixed(5)),
          },
          markerType: TypeMarker.Stop,
        };
      }

   static getInfoLocation(coordinate: any) {
    return {
      id: 'dir' + (coordinate.latitude + coordinate.longitude),
      data: {
        name: `${parseFloat(
          parseFloat(coordinate.latitude).toFixed(6),
        )}, ${parseFloat(parseFloat(coordinate.longitude).toFixed(6))}`,
        address: `${parseFloat(
          parseFloat(coordinate.latitude).toFixed(6),
        )}, ${parseFloat(parseFloat(coordinate.longitude).toFixed(6))}`,
      },
      position: {
        latitude: parseFloat(parseFloat(coordinate.latitude).toFixed(6)),
        longitude: parseFloat(parseFloat(coordinate.longitude).toFixed(6)),
      },
      markerType: TypeMarker.Direction,
    };
  }   
}