import { IPosition } from './interfaces';

export interface ILegGeometry {
  points: string;
  levels?: any | null;
  length: number;
}

export interface IStep {
  distance: number;
  relativeDirection: string; //LEFT, RIGHT, CONTINUE...
  streetName?: string | null;
  absoluteDirection?: string | null;
  exit?: any | null;
  stayOn: boolean;
  area: boolean;
  bogusName: boolean;
  lon: number;
  lat: number;
  alerts?: any | null;
  elevation: Array<any>;
}
export interface ILocationPlan {
  name: string;
  stopId?: string | null;
  stopCode?: string | null;
  platformCode?: any | null;
  lon: number;
  lat: number;
  arrival?: number | null;
  departure?: number | null;
  orig?: string | null;
  zoneId?: any | null;
  stopIndex?: number | null;
  stopSequence?: number | null;
  vertexType?: string | null;
  bikeShareId?: any | null;
}

export interface ILeg {
  startTime: number;
  endTime: number;
  departureDelay?: number | null;
  arrivalDelay?: number | null;
  realTime: boolean;
  isNonExactFrequency?: any | null;
  headway?: any | null;
  distance?: number | null;
  pathway?: boolean | null;
  mode: string; //WALK, BUS, RAIL, SUBWAY, TRANSIT
  route?: string | null;
  agencyName?: string | null;
  agencyUrl?: string | null;
  agencyTimeZoneOffset?: number | null;
  routeColor?: any | null;
  routeType?: any | null;
  routeId?: any | null;
  routeTextColor?: any | null;
  interlineWithPreviousLeg?: boolean | null;
  tripShortName?: any | null;
  tripBlockId?: any | null;
  headsign?: any | null;
  agencyId?: any | null;
  tripId?: any | null;
  serviceDate?: any | null;
  from: ILocationPlan;
  to: ILocationPlan;
  intermediateStops: Array<ILocationPlan>;
  legGeometry: ILegGeometry;
  steps?: Array<IStep> | null;
  alerts?: any | null;
  routeShortName?: string | null;
  routeLongName?: string | null;
  boardRule?: any | null;
  alightRule?: any | null;
  rentedBike?: boolean | null;
  transitLeg?: boolean | null;
  duration?: any | null;
  onTheTransport?: number | null; //control de si se ha subido al transporte de dicha leg (parámetro propio)
  nextDepartureTimes?: Array<any>; //control de próximos tiempos de salida en una parada de transporte público
  transhipment?: boolean; //control de si ese tramo termina con tranbordo al siguiente
  styleNew?: any; // control del estilo
}
export interface IItinerary {
  duration: number;
  startTime: number;
  endTime: number;
  walkTime?: number | null;
  transitTime: number;
  waitingTime: number;
  walkDistance: number;
  walkLimitExceeded?: boolean | null;
  elevationLost: any; //float
  elevationGained: any; //float
  transfers: number;
  fare?: any | null;
  legs: Array<ILeg>;
  tooSloped?: boolean | null;
}
export interface IPlanResult {
  date: number;
  from: ILocationPlan;
  to: ILocationPlan;
  itineraries: Array<IItinerary>;
  error?: any | null;
}
export interface IPlannerResponseOTP {
  idPlanning?: string;
  requestParameters: any;
  debugOutput: any;
  plan?: IPlanResult | null;
  error?: any | null;
}

export interface IPlannerPolyline {
  color?: string;
  coords: Array<any>;
  destination: IPosition;
  origin: IPosition;
}

export interface IFavoritePlan {
  id: string;
  planPoints: Array<IPlanPoint>;
  planProperties: Array<any>;
  planResponse: Array<any>;
}

export interface IPlanPoint {
  address?: string;
  favoriteAddressId?: any;
  isFavouriteUser?: any;
  latitude: number;
  longitude: number;
  name?: string;
  order: number;
  poiId?: any;
  stopId?: number;
  stopTime?: any;
  type?: number;
}

export enum TypeRouteFilter {
  FAST,
  TRANSFER,
  WALK,
}
