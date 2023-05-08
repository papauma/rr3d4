import { IMarker } from "@src/types/interfaces";

export function getRegionDeltasFromZoom(zoom, latitude) {
    const ONE_LATITUDE_DEGREE_IN_METERS = 111.32 * 1000;
    const longitudeDelta = Math.exp(Math.log(360) - zoom * Math.LN2);
    const accuracy =
      longitudeDelta * (ONE_LATITUDE_DEGREE_IN_METERS * Math.cos(latitude * (Math.PI / 180)));
    const latitudeDelta = accuracy / ONE_LATITUDE_DEGREE_IN_METERS;
    return {
      longitudeDelta,
      latitudeDelta,
    };
  }

export function calcZoomMobile(widthDevice: number, longitudeDelta: number): number {
    return Math.round(Math.log2(360 * (widthDevice / 256 / longitudeDelta)) + 1);
}

export function filterBounds(
  markers: Array<IMarker>,
  { south, north, west, east },
): Array<IMarker> {
  return markers.filter(
    (marker) =>
      marker.position.latitude < north &&
      marker.position.latitude > south &&
      marker.position.longitude > west &&
      marker.position.longitude < east,
  );
}