import { AccessibilityState, Image } from 'react-native';
import { MarkerDragStartEndEvent, MarkerPressEvent } from 'react-native-maps';
import { IDataMarker, TypeMarker } from './ExploreInterfaces';

export interface IButton {
  styleName?: any;
  textStyle?: any;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityState?: AccessibilityState;
  Icon?: any;
  disabled?: boolean;
  onPress?: () => void;
  title?: string;
  printClassName?: boolean;
  callBack?: Function;
  viewButton?: any;
}

export interface IButtonNotification {
  styleName?: any;
  textStyle?: any;
  Icon?: any;
  accessibilityLabel?: string;
  disabled?: boolean;
  onPress?: () => void;
  title?: string;
  printClassName?: boolean;
  callBack?: Function;
  viewButton?: any;
  notification?: number;
}

export interface IBottomSheet {
  onChange?: any;
  initial?: number;
  snapPoints?: any;
  enableContentPanningGesture?: boolean;
  enableHandlePanningGesture?: boolean;
  enablePanDownToClose?: boolean;
  topContent?: any;
  onAnimate?: Function;
  children?: any;
  // refMapView: (instance: any) => void;
}

export interface IMap {
  initialRegion: ILocation;
  drawListenerMarkers?: Array<any>;
  markers?: Array<IMarker>;
  updateZoom?: (zoom: number) => void;
  updateBounds?: (bounds: IBounds, zoom?: number) => void;
  zoom: number;
  focus?: (params: any) => void;
  location?: ILocation | null;
  // refMapView: (instance: any) => void;
  showButtonFocus?: boolean;
  onLongPress?: Function;
  draggableMarkers?: boolean;
  circles?: Array<any>;
  polylines?: Array<any>;
  onDragEnd?: (event: MarkerDragStartEndEvent, initialPosition: IPosition) => void;
  setRefMapView?: Function; //setear la referencia del mapa si se quiere usar
  pointerEvents?: any;
  onMapDragComplete?: Function;
  setTrackViewChanges?: boolean; //setear el escuchador de cambios del mapa para android
  disableTooltip?: boolean; //desactiva visualmente el tooltip
}
export interface IMapMarker {
  position: IPosition;
  flyZoom?: number;
  title?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  width?: number;
  height?: number;
  content?: any;
  tracksViewChanges?: boolean;
  draggable?: boolean;
  anchor?: any;
  disableTooltip?: true;
  onPress?: (event: MarkerPressEvent) => void;
  onDragEnd?: (event: MarkerDragStartEndEvent, initialPosition: IPosition) => void;
}

export interface IMapPin {
  source: any;
  className?: string;
  title?: string;
  selected?: boolean;
}

export interface ILocation {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface IBounds {
  south: number;
  north: number;
  west: number;
  east: number;
}

export interface IPosition {
  latitude: number;
  longitude: number;
}

export interface IMarcadores {
  DataOrigin: Array<IDataOrigin>;
  Category: Array<ICategory>;
  Stops: Array<IStop>;
  Lines: Array<ILine>;
  Pois: Array<IPoi>;
  Agency: Array<IAgency>;
  TransportMode: Array<ITransportMode>;
}

export interface IMarker {
  id: number;
  position: IPosition;
  content?: any;
  data?: IDataMarker;
  markerType: TypeMarker;
  anchor?: any;
  accessibilityHint?: string;
  width?: number;
  height?: number;
  onPress?: (event: MarkerPressEvent) => void;
}

export interface IMarkers {
  stops: Array<IMarker>;
  pois: Array<IMarker>;
  lines: Array<IMarker>;
  categories: Array<IMarker>;
  agencies: Array<IMarker>;
  transportModes: Array<IMarker>;
  dataOrigins: Array<IMarker>;
}
export interface IDataOrigin {
  agencyId: number;
  transportModes: Array<{
    iconMarkAlertId: number;
    iconMarkFavAlertId: number;
    iconMarkFavOperatorAlertId: number;
    iconMarkFavOperatorId: number;
    iconMarkFavTransportId: number;
    iconMarkOperatorAlertId: number;
    iconMarkOperatorId: number;
    iconMarkTransportId: number;
    iconMarkTransportIdSelected: number;
  }>;
}

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  iconUrl?: string;
  iconFavoriteUrl?: string;
  iconId?: number;
  iconFavoriteId?: number;
  iconMarkId?: number,
  iconMarkFavoriteId?: number;
  iconSelectedId?: number;
  iconSelectedFavoriteId?: number;
  iconFilterId?: number;
  iconFilterSelectedId?: number;
}
export interface IStop {
  id: number;
  agencyOriginId: number;
  stopLat: number;
  stopLon: number;
}
export interface IItemSearch {
  tooltip?: string;
  className?: string;
  style?: React.CSSProperties;
  Icon?: Image | string;
  disabled?: boolean;
  onClick?: (...params: any) => void;
  name?: string;
  type?: string;
}

export interface ILine {}

export interface IPoi {
  id: number;
  poiOriginId: number;
  poiCategoryId: number;
  name: string;
  description?: string;
  address?: string;
  poiPhone?: string;
  poiEmail?: string;
  poiWeb?: string;
  poiLat: number;
  poiLon: number,
  updatedAt: any;
  iconFavoriteId: any;
  iconId?: number;
  favorite?: number;
  level?: any;
}

export interface IPoiSearch {
  id: number;
  type: string;
  name: string;
  description?: string;
  address?: string;
  lat: string;
  lon: string,
  iconId?: number;
  iconFavoriteId?: number;
}

export interface IAgency {}

export interface ITransportMode {
  id: number;
  label: string;
  iconId: number;
  iconFilterId: number;
  iconDisabledId: number;
  iconFilterSelectedId: number;
  iconFilterDisabledId: number;
  iconMarkFavTransportId: number;
  iconBnId: number;
}

export interface ITransportSection {
  id: number;
  name: string;
  icon?: any;
  transportModes?: Array<number>;
  webPlans?: Array<string>;
  webTarifas?: Array<string>;
}
