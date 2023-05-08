import { createSlice } from '@reduxjs/toolkit';
import { MMKV } from 'react-native-mmkv'
import { IMarker } from '../../types/interfaces';
import { RootState } from './../store';

// Define a type for the slice state
interface MapState {
  zoom: number;
  bounds: {
    south: number;
    north: number;
    west: number;
    east: number;
  } | null;
  region: {
    latitude: number;
    longitude: number;
  } | null;
  markers: Array<IMarker>;
  markerSelected: IMarker | null;
  polylines: [];
  location: any;
  mapRef: any;
  layerSelected: number;
}

// Define the initial state using that type
const initialState: MapState = {
  zoom: 10,
  bounds: null,
  region: null,
  location: null,
  markers: [],
  markerSelected: null,
  polylines: [],
  mapRef: null,
  layerSelected: 0,
};
const storage = new MMKV();

export const mapSlice = createSlice({
  name: 'map',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateZoom: (state, action) => {
      console.log(' [mapSlice] - updateZoom - ');
      state.zoom = action.payload;
    },
    updateBounds: (state, action) => {
      console.log(' [mapSlice] - updateBounds');
      state.bounds = action.payload;
    },
    updateRegion: (state, action) => {
      console.log(' [mapSlice] - updateRegion');
      state.region = action.payload;
    },
    updateLocation: (state, action) => {
      console.log(' [mapSlice] - updateLocation');
      state.location = action.payload;
    },
    updateMarkers: (state, action) => {
      console.log(' [mapSlice] - updateMarkers');
      state.markers = action.payload;
    },
    updateMapRef: (state, action) => {
      console.log(' [mapSlice] - updateMapRef');
      state.mapRef = action.payload;
    },
    updateLayerSelected: (state, action) => {
      console.log(' [mapSlice] - updateLayerSelected');
      state.layerSelected = action.payload;
    },
    updateMarkerSelected: (state, action) => {
      console.log(' [mapSlice] - updateMarkerSelected');
      state.markerSelected = action.payload;
    },
    updatePolylines: (state, action) => {
      console.log(' [mapSlice] - updatePolylines');
      state.polylines = action.payload;
    },
    updatePolylinesGeneric: (state, action) => {
      console.log(' [mapSlice] - updatePolylinesGeneric');
      state.polylines = action.payload;
      storage.set(
        'polylinesGeneric',
        JSON.stringify({ flag: new Date().getTime(), lines: JSON.stringify(state.polylines) }),
      );
    },
  },
});

export const {
  updateLocation,
  updateZoom,
  updateBounds,
  updateMarkers,
  updateMarkerSelected,
  updatePolylines,
  updateMapRef,
  updatePolylinesGeneric,
  updateLayerSelected,
  updateRegion,
} = mapSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const mapState = (state: RootState) => state.map;
export const mapStateZoom = (state: RootState) => state.map.zoom;
export const mapStateBounds = (state: RootState) => state.map.bounds;
export const mapStateRegion = (state: RootState) => state.map.region;
export const mapStateMarkers = (state: RootState) => state.map.markers;
export const mapStateMarkerSelected = (state: RootState) => state.map.markerSelected;
export const mapStatePolylines = (state: RootState) => state.map.polylines;
export const mapStateLocation = (state: RootState) => state.map.location;
export const mapStateLayerSelected = (state: RootState) => state.map.layerSelected;


export default mapSlice.reducer;
