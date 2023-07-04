import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Label from '../../../components/commons/text/Label';
import RouteUtils from '../../../utils/RouteUtils';
import { lineInfoMarkersState, lineInfoPolyLineState } from '../../slices/lineInfoSlice';
import React from 'react'
import { useTheme } from '@src/context/themeContext';

export default function InfoLineMapPresenter() {
  const lineaState = useSelector(lineInfoPolyLineState);
  const markersState = useSelector(lineInfoMarkersState);
  const theme = useTheme()

  function drawPolylineLines(refMapView) {
    if (lineaState.length > 0) {
      /*const puntoMitad = parseInt(lineaState[0].path.length / 2)

       refMapView?.animateCamera({
        center: {
          latitude: lineaState[0].path[puntoMitad].latitude,
          longitude:lineaState[0].path[puntoMitad].longitude,
        },
        zoom: 11,
      });*/
      return lineaState
    }
  }

  const generateContent = (marker, index, length) => {
    if (marker !== undefined && index !== undefined && length !== undefined) {
      if (index === 0) {
        return (
          <View style={{alignItems: 'center'}}>
            <View style={styles.tooltip}>
              <Label style={styles.titleTooltip}>Inicio: {marker.data.name.toLowerCase()}</Label>
            </View>
            <View style={styles.tooltipPolygon} />
          </View>
          );
      } else if (index === length -1) {
        return (
          <View style={{alignItems: 'center'}}>
            <View style={styles.tooltip}>
              <Label style={styles.titleTooltip}>Fin: {marker.data.name.toLowerCase()}</Label>
            </View>
            <View style={styles.tooltipPolygon} />
          </View>
          );
      } else {
        return <View/>
      }
    }
  }


  const drawMarkers = () => {
    if (markersState.length > 0 ) {
      const listaMarcadores = markersState.map((marker, index) => (
        {
          id: index,
          markerType: 'CIRCLESTOP',
          position:
            RouteUtils.getClosestToStop({latitude: parseFloat(marker.position.lat),
              longitude: parseFloat(marker.position.lng)}, lineaState[0].path)
          ,
          data: { ...marker.data },
          content: generateContent(marker, index, markersState.length),
          anchor: { x: 0.5, y: 0.5 },
        }
      )) 

      return listaMarcadores;
    } else {
      return []
    }
  }



  const drawCirclesLine = () => {
    let circles: Array<any> = [];

      if (markersState.length > 0 ) {
        circles = circles.concat(
          markersState.map((stop, index) => {
            const mark = {
              id: index,
              location: RouteUtils.getClosestToStop(
                {
                  latitude: parseFloat(stop.position.lat),
                  longitude: parseFloat(stop.position.lng),
                },
                lineaState[0].path,
              ),
              title: stop.name,
            };

            return {
              marker: mark,
              properties: {
                strokeColor: '#' + stop.data?.routeColor,
                fillColor: theme.colors.white,
                strokeWidth: 3,
              },
            };
          }),
        );
      }

    return circles;
  };

  return {
    drawPolylineLines, drawMarkers, drawCirclesLine
  };
}

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  tooltipPolygon: {
    width: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderTopWidth: 7,
    borderColor: 'transparent',
    borderTopColor: 'white',
    height: 0,
  },
  titleTooltip: {
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
})
