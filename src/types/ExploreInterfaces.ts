import { INoraResponse } from './DirectionsInterfaces';

export enum TypeShowInBottomsheetHome {
  Empty,
  Direction,
  Stop,
  Poi,
}

export enum TypeMarker {
  Stop,
  Direction,
  Poi,
  Intercambiador,
}

export interface SearchStopType {
  agencyOriginId: number;
  icon: any;
  id: number;
  stopCode: string;
  stopDesc?: string;
  stopLat: number;
  stopLocationType?: number;
  stopLon: number;
  stopName: string;
  stopWheelchairBoarding?: number;
  stopGtfsId?: string;
  stopTransportMode: number;
  stopParentStopId?: number;
  stopZoneId?: string;
  stopLevelId?: any;
  stopUrl?: string;
}

export interface IDataMarker {
  name?: string;
  address?: string;
  icons?: any;
  agencyOriginId?: number;
  transportMode?: number;
  directionInfo?: INoraResponse;
  poiCategory?: number;
  code?: string;
}

export interface ILineTime {
  lineId: number;
  tripId?: number;
  agencyOriginId: number;
  codeLine?: string;
  nameLine: string;
  codeStop: string;
  nameStop: string;
  localtionType: string;
  transportType?: number;
  headSign?: string;
  routeColor?: string;
  time?: string;
  wheelchair?: number;
  fecha?: string;
  routeTextColor?: string;
}

export interface ILine {
  id: number;
  agencyOriginId: number;
  code: string;
  name: string;
  transportmode: number;
  level?: number;
  locationType: string;
  headSign: string;
  wheelchairAccesible?: number;
  url?: string;
  routeColor?: string;
  continuousPickup?: string;
  continuousDropOff?: string;
  routeTextColor?: string;
  routeGtfsId?: string;
  lineTimes?: Array<ILineTime>;
}
