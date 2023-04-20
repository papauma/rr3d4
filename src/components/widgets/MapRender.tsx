import { calcZoomMobile, getRegionDeltasFromZoom } from '@src/utils/utilsMaps';
import { useState } from 'react';
import { Dimensions, View } from 'react-native';
import MapView, { BoundingBox, UrlTile } from 'react-native-maps';
/*import { IMap } from '../../types/interfaces';
import { random } from '../../utils/StringUtils';
import { styles } from '../../utils/constants';
import { calcZoomMobile, getRegionDeltasFromZoom } from '../../utils/utils';
import MapMarker from '../commons/map/MapMarker';*/

export default function MapRender(props) {
  console.log('[MapRender]');
  const [mapInstance, setMapInstance] = useState<MapView | null>();
  const [tracksViewChanges, setTracksViewChanges] = useState(false);
  const widthDevice = Dimensions.get('window').width;
  /*const [first, setfirst] = useState({
    ...styles.map,
    ...styles.map['map-control-buttons'],
  });*/

  //console.log('[MapRender] - markers ????', props.markers.length);

  /*useEffect(() => {
    if (props.setTrackViewChanges) {
      setTracksViewChanges(true);
      setTimeout(() => setTracksViewChanges(false), 100);
    }
  }, [props.setTrackViewChanges]);
*/
  /*const markers = useMemo(() => {
    //console.log('[MapRender] - useMemo Markers');
    const markers =
      props !== null &&
      props !== undefined &&
      props.markers !== null &&
      props.markers !== undefined &&
      props.markers.length > 0 &&
      props.markers?.map((marker) => (
        <MapMarker
          key={marker.id}
          title={marker?.data?.name}
          accessibilityLabel={marker?.data?.name}
          accessibilityHint={marker.accessibilityHint}
          position={marker.position}
          width={marker.width + 10}
          height={marker.height + 10}
          content={marker.content}
          onPress={marker.onPress}
          tracksViewChanges={tracksViewChanges}
          draggable={props.draggableMarkers}
          anchor={marker.anchor}
          onDragEnd={props.onDragEnd}
        />
      ));

    return markers;
  }, [props.markers, tracksViewChanges, props.onDragEnd, props.draggableMarkers]);

  const polylines = useMemo(() => {
    console.log('renderPolylines() - renderPolylines');
    const polylines =
      props !== null &&
      props !== undefined &&
      props.polylines !== null &&
      props.polylines !== undefined &&
      props.polylines.length > 0 &&
      props.polylines.map((polylines, index) => (
        <Polyline
          key={`${index} polyline`}
          coordinates={polylines.path}
          {...polylines.properties}
        />
      ));
    return polylines;
  }, [props.polylines]);

  const renderCircles = () => {
    if (props.circles?.length === 0) {
      return;
    }
    return props.circles?.map(({ marker, properties }) => (
      <Circle
        key={`Circle-${marker?.id ?? random()}`}
        zIndex={50}
        center={marker?.location}
        radius={renderCirclebyZoom()}
        {...properties}
      />
    ));
  };*/

  const renderCirclebyZoom = () => {
    let changedRadius = -17.26205 * props.zoom + 305.94878;
    return changedRadius >= 3 ? changedRadius : 3;
  };

  function onRegionChangeComplete(region) {
    props.onMapDragComplete?.(region);

    if (!tracksViewChanges) {
      setTracksViewChanges(true);
      setTimeout(() => setTracksViewChanges(false), 100);
    }
    const zoom = calcZoomMobile(widthDevice, region.longitudeDelta);
    if (props.zoom !== zoom) {
      props.updateZoom && props.updateZoom(zoom);
    }
    props.updateBounds &&
      mapInstance &&
      mapInstance.getMapBoundaries().then((bounds: BoundingBox) => {
        props.updateBounds &&
          props.updateBounds(
            {
              south: bounds.southWest.latitude,
              north: bounds.northEast.latitude,
              west: bounds.southWest.longitude,
              east: bounds.northEast.longitude,
            },
            zoom,
          );
      });
  }

  function onRegionChange() {
    if (tracksViewChanges) {
      setTracksViewChanges(false);
    }
  }

  return (
    <View style={[{ flex: 1 }]}>
      <MapView
        ref={(instance) => {
          setMapInstance(instance);
          // props.refMapView(instance);
        }}
        style={{ flex: 1 }}
        showsCompass={false}
        mapType={'none'}
        maxZoomLevel={19}
        minZoomLevel={7}
        onMapReady={()=>console.log('MAPA READY!!!!')}
        onMapLoaded={(event) => {
          console.log('MAPA LOADED!!!!');
          props.setRefMapView?.(mapInstance);
          props.updateBounds &&
            mapInstance?.getMapBoundaries().then((bounds: BoundingBox) => {
              props.updateBounds &&
                props.updateBounds(
                  {
                    south: bounds.southWest.latitude,
                    north: bounds.northEast.latitude,
                    west: bounds.southWest.longitude,
                    east: bounds.northEast.longitude,
                  },
                  props.zoom,
                );
            });
          event?.preventDefault();
        }}
        onRegionChangeComplete={onRegionChangeComplete}
        //onRegionChange={onRegionChange}
        initialRegion={{
          latitude: props.initialRegion.latitude,
          longitude: props.initialRegion.longitude,
          ...getRegionDeltasFromZoom(props.zoom, props.initialRegion.latitude),
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        onLongPress={(event) => props.onLongPress?.(event)}
      >

        <UrlTile
          urlTemplate={'https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'}
          shouldReplaceMapContent={true}
          tileSize={256}
          maximumZ={20}
          flipY={false}
          style={{ zIndex: 1 }}
          />
        <>{/*markers*/}</>
        <>{/*polylines*/}</>
        {/*props.circles && renderCircles()*/}
      </MapView>
    </View>
  );
}
