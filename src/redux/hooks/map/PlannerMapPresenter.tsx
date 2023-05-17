import Icon from '@src/components/commons/icon/Icon';
import IconDynamic from '@src/components/commons/icon/IconDynamic';
import { useTranslate } from '@src/context/languageContext';
import { useTheme } from '@src/context/themeContext';
import { agencyInformation } from '@src/redux/slices/agencysSlices';
import { plannerSegmentsInformation, plannerSegmentsSlice } from '@src/redux/slices/plannerSegmentsSlice';
import { plannerInformation } from '@src/redux/slices/plannerSlice';
import { TypeMarker } from '@src/types/ExploreInterfaces';
import { IMarker, IPosition } from '@src/types/interfaces';
import React from 'react';
import { Platform } from 'react-native';
import { LongPressEvent, MarkerDragStartEndEvent } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useSearch from '../search/useSearch';
import { ILeg } from '@src/types/PlannerInterfaces';
import PlanUtils from '@src/utils/PlanUtils';
import RouteUtils from '@src/utils/RouteUtils';

export default function PlannerMapPresenter() {
  const agencyInfo = useSelector(agencyInformation);
  const dataOrigin = agencyInfo.dataOrigin;
  const segments: Array<IMarker | undefined> = useSelector(plannerSegmentsInformation);
  const plannerInfo = useSelector(plannerInformation);
  const planResult = plannerInfo.plannerResult;
  const selectedIti = plannerInfo.selectedPlan;
  const dispatch = useDispatch();
  const {onLocation} = useSearch()
  const coords = RouteUtils.getItiCoords(planResult, selectedIti, segments.length > 2);
  //To CHANGE
  const userLocation = null;
  const t = useTranslate();
  const theme = useTheme()

  const renderMarker = (marker) => {
    let index = segments.findIndex((element: IMarker | undefined) => element?.id === marker.id);

    let last = segments.length - 1;

    let icon =
      index === 0
        ? segments[index]?.position && segments[index]?.data?.name === t('marker_myLocation')
          ? theme.drawables.general.Ic_Point_MyLocation
          : theme.drawables.general.Ic_Point_MyLocation
        : index === last
          ? theme.drawables.general.Ic_Point_Dest
          : theme.drawables.general.Ic_Point_MyLocation

    return icon;
  };

  function drawPlannerMarkers() {
    let segmentsFiltered = JSON.parse(
      JSON.stringify(segments.filter((element: any) => element?.position)),
    );
    segmentsFiltered.forEach((segment: IMarker) => {
      segment.content = (
        <Icon source={renderMarker(segment)} style={{ width: 24, height: 24 }} />
      );
      segment.anchor = { x: 0.5, y: 0.5 };
    });

    return segmentsFiltered;
  }

  function drawRoutePlannerMarkers(parsedRoute: Array<ILeg>) {
    let initialMarkers = drawPlannerMarkers();

    if (!parsedRoute) {
      return initialMarkers;
    }

    let markersOfPublicTransport = parsedRoute?.map((element: ILeg, index: number) => {
      if (
        PlanUtils.isPublicMode(element.mode)
      ) {
        //TO CHANGE (tema de los :)
        const calculatedAgencyId = element.agencyId !== null ? element.agencyId.split(':')[1] : null; // '21:4'
        let dataOriginElem = dataOrigin.find(
          (dataOri: any) => String(dataOri.gtfsAgency[0]?.id) === calculatedAgencyId,
        );

        console.log('Route marker', dataOriginElem);
        
        let iconId = dataOriginElem?.transportModes[0]?.iconMarkTransportId;

        let marker: IMarker = {
          id: index,
          markerType: TypeMarker.Direction,
          position: {
            latitude: parseFloat(element.from.lat.toFixed(5)),
            longitude: parseFloat(element.from.lon.toFixed(5)),
          },
          data: { name: element.from.name },
          content: <IconDynamic iconId={iconId} />,
          anchor: { x: 0.5, y: 0.5 },
        };

        return marker;
      }

      return null;
    });

    markersOfPublicTransport = markersOfPublicTransport.filter((element: any) => element);

    return initialMarkers.concat(markersOfPublicTransport);
  }

  function obtainPolylineBySegments() {
    return segments.filter((m) => m?.position).map((segment) => segment?.position);
  }

  function polylineProps() {
    if (Platform.OS === 'ios') {
      return {
        zIndex: 2,
        strokeColor: 'black',
        strokeWidth: 2,
        lineJoin: 'round',
        lineDashPattern: [4, 4],
      };
    } else {
      return {
        zIndex: 2,
        strokeColor: 'black',
        strokeWidth: 8,
        lineJoin: 'round',
        lineDashPattern: [40, 20],
      };
    }
  }

  function drawPolyline() {
    return [{ path: obtainPolylineBySegments(), properties: polylineProps() }];
  }

  async function onLongPressOnThePlannerMap(event: LongPressEvent) {
    let index = segments?.findIndex((segment) => segment === null || segment === undefined);
    if (index !== -1) {
      const markerDirection = await onLocation(
        event.nativeEvent.coordinate.latitude,
        event.nativeEvent.coordinate.longitude,
      );
      dispatch(plannerSegmentsSlice.actions.set({ index: index, stop: markerDirection }));
    }
  }

  async function onDragMarker(event: MarkerDragStartEndEvent, initialPosition: IPosition) {
    let index = segments?.findIndex(
      (segment) => JSON.stringify(segment?.position) === JSON.stringify(initialPosition),
    );
    if (index !== -1) {
      const markerDirection = await onLocation(
        event.nativeEvent.coordinate.latitude,
        event.nativeEvent.coordinate.longitude,
      );

      dispatch(plannerSegmentsSlice.actions.set({ index: index, stop: markerDirection }));
    }
  }

  function polylinePropsOfRouteItinerary(color) {
    if (Platform.OS === 'ios') {
      return {
        zIndex: 2,
        strokeColor: color ? color : undefined,
        strokeWidth: 2,
        lineJoin: 'round',
        lineDashPattern: color === '#9B9B9B' ? [4, 4] : null,
      };
    } else {
      return {
        zIndex: 2,
        strokeColor: color ? color : undefined,
        strokeWidth: 8,
        lineJoin: 'round',
        lineDashPattern: color === '#9B9B9B' ? [40, 20] : null,
      };
    }
  }

  function drawPolylineRoutes() {
    if (coords?.length > 0) {
      const polylineCoords = coords?.map((feature, index) => {
        return {
          path: feature.coords,
          properties: polylinePropsOfRouteItinerary(feature.color),
          index: index,
        };
      });
      return polylineCoords;
    }
  }

  /* const drawCirclesItinerary = () => {
    let stops = [];

    for (let i = 0; i < coords?.length; i++) {
      const feature = coords[i];
      if (feature.intermediateStops) {
        stops = stops.concat(
          feature.intermediateStops.map((stop) => {
            const mark = {
              id: stop.stopId,
              location: RouteUtils.getClosestToStop(
                {
                  latitude: parseFloat(stop.lat),
                  longitude: parseFloat(stop.lon),
                },
                feature.coords,
              ),
              title: stop.name,
            };

            return {
              marker: mark,
              properties: {
                strokeColor: feature.color,
                fillColor: R.resources.colors.white,
                strokeWidth: 3,
              },
            };
          }),
        );
      }
    }

    return stops;
  }; */

  return {
    drawPlannerMarkers,
    drawRoutePlannerMarkers,
    drawPolyline,
    onLongPressOnThePlannerMap,
    onDragMarker,
    drawPolylineRoutes,
    //drawCirclesItinerary,
  };
}
