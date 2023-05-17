import { IMarker, IPosition } from "@src/types/interfaces";
import { Platform } from "react-native";

export default class GeoUtils {
  static calculateDistanceBetweenTwoPoins(lat1: number, lon1: number, lat2: number, lon2: number) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 * 1000;
      return dist;
    }
  }

  static calculateRegion(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d;
  }

  static calculateMeanPoint(point1?: IMarker, point2?: IMarker) {
    if (point1?.position && point2?.position) {
      let latitude =
        (point1.position?.latitude + point2.position?.latitude) / 2;
      let longitude =
        (point1.position?.longitude + point2.position?.longitude) / 2;

      return {
        position: {
          latitude: parseFloat(latitude.toFixed(5)),
          longitude: parseFloat(longitude.toFixed(5)),
        },
      };
    }

    return undefined;
  }

  /**
   * @function getMidZoom obtiene el zoom idóneo para representar los puntos
   */
  static getMidZoom(point1: IPosition, point2: IPosition) {
    let longitude1 = parseFloat(point1?.longitude.toFixed(5));
    let longitude2 = parseFloat(point2?.longitude.toFixed(5));
    let latitude1 = parseFloat(point1?.latitude.toFixed(5));
    let latitude2 = parseFloat(point2?.latitude.toFixed(5));
    let theta = longitude1 - longitude2;
    let distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(latitude1 * (Math.PI / 180)) *
          Math.sin(latitude2 * (Math.PI / 180)) +
          Math.cos(latitude1 * (Math.PI / 180)) *
            Math.cos(latitude2 * (Math.PI / 180)) *
            Math.cos(theta * (Math.PI / 180)),
      );
    let res = distance * 1.609344;

    if (Platform.OS === 'ios') {
      if (res >= 0 && res < 0.4) {
        return 2000;
      }
      if (res >= 0.4 && res < 1) {
        return 4000;
      }
      if (res >= 1 && res < 3) {
        return 8000;
      }
      if (res >= 3 && res < 5) {
        return 16000;
      }
      if (res >= 5 && res < 10) {
        return 32000;
      }
      if (res >= 10 && res < 25) {
        return 64500;
      }
      if (res >= 25 && res < 50) {
        return 84000;
      }
      if (res >= 50 && res < 75) {
        return 120000;
      }
      if (res >= 75) {
        return 300000;
      }

      return 300000
    }

    if (res >= 0 && res < 0.4) {
      return 18;
    }
    if (res >= 0.4 && res < 1) {
      return 16;
    }
    if (res >= 1 && res < 3) {
      return 15;
    }
    if (res >= 3 && res < 5) {
      return 14;
    }
    if (res >= 5 && res < 10) {
      return 13;
    }
    if (res >= 10 && res < 25) {
      return 12;
    }
    if (res >= 25 && res < 50) {
      return 11;
    }
    if (res >= 50 && res < 75) {
      return 10;
    }
    if (res >= 75) {
      return 10;
    }

    return res;
  }

  static getMidZoomAllPlatforms(point1: IPosition, point2: IPosition) {
    let longitude1 = parseFloat(point1?.longitude.toFixed(5));
    let longitude2 = parseFloat(point2?.longitude.toFixed(5));
    let latitude1 = parseFloat(point1?.latitude.toFixed(5));
    let latitude2 = parseFloat(point2?.latitude.toFixed(5));
    let theta = longitude1 - longitude2;
    let distance =
      60 *
      1.1515 *
      (180 / Math.PI) *
      Math.acos(
        Math.sin(latitude1 * (Math.PI / 180)) *
          Math.sin(latitude2 * (Math.PI / 180)) +
          Math.cos(latitude1 * (Math.PI / 180)) *
            Math.cos(latitude2 * (Math.PI / 180)) *
            Math.cos(theta * (Math.PI / 180)),
      );
    let res = distance * 1.609344;

    if (res >= 0 && res < 0.4) {
      return 17;
    }
    if (res >= 0.4 && res < 1) {
      return 15;
    }
    if (res >= 1 && res < 3) {
      return 14;
    }
    if (res >= 3 && res < 5) {
      return 14;
    }
    if (res >= 5 && res < 10) {
      return 13;
    }
    if (res >= 10 && res < 25) {
      return 12;
    }
    if (res >= 25 && res < 50) {
      return 11;
    }
    if (res >= 50 && res < 75) {
      return 10;
    }
    if (res >= 75) {
      return 10;
    }

    return res;
  }
}
