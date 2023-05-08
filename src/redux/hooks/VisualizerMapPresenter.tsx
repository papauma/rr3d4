import { TypeMarker } from '@src/types/ExploreInterfaces';
import { IBounds, IMarker } from '@src/types/interfaces';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { mapStateMarkers, updateMarkers } from '../slices/mapSlice';
import { iconsState, updateIcon } from '../slices/iconsSlices';
import { filterBounds } from '@src/utils/utilsMaps';
import { useLazyGetIconsQuery } from '../services/iconsServices';
import { stopsState } from '../slices/stopsSlices';
import IconDynamic from '@src/components/commons/icon/IconDynamic';

export default function VisualizerMapPresenter() {
  const dispatch = useDispatch();
  const selectorMapMarkers = useSelector(mapStateMarkers);
  const selectorIcons = useSelector(iconsState);
  const selectorStops = useSelector(stopsState);
  const [GetIcons] = useLazyGetIconsQuery();

  function renderVisualizerMarkers(markers: IMarker[]) {
    let markersToRender: Array<IMarker> = JSON.parse(JSON.stringify(markers));

    return markersToRender.map((marker: IMarker) => {
        if (marker.markerType === TypeMarker.Stop) {
            marker.content = (<IconDynamic
             iconId={marker.data?.icons?.iconMarkTransportId}

            />)
        }
      
        return marker
    })
  }

  async function getMarkers(bounds?: IBounds, zoom?: number, callbackOnFinish?: Function) {
    console.log('[Home Screen] - GET MARKERS zoom:' + zoom);
    let markers: Array<IMarker> = [];

    // COMPROBAR CONDICION PARA MOSTRAR MARKERS
    //TO CHANGE

    if (zoom !== undefined && zoom < 16 /* || !props.precarga */) {
      if (selectorMapMarkers.length > 0) {
        dispatch(updateMarkers(markers));
      }
      //console.log('[Home Screen] - GET MARKERS < 16 - ' + markers.length);
      return markers;
    }

    // FILTRADO POR LIMITES
    let stops = bounds ? filterBounds(selectorStops, bounds) : selectorStops;
    //let pois = bounds ? filterBounds(selectorPois, bounds) : selectorPois;

    // fILTRADO POR TIPO TRANSPORTES (filtros)
    /* stops =
      selectorSearchFilters.transportModes?.length > 0 || selectorSearchFilters.sellingCategories?.length > 0
        ? stops.filter((stop) => selectorSearchFilters.transportModes.includes(parseInt(stop.data.transportMode)))
        : stops; */

    //Filtrado por categoría de poi
    /* let poiFilterCat = selectorSearchFilters.sellingCategories.concat(selectorSearchFilters.otherCategories)
    pois = poiFilterCat.length > 0 || selectorSearchFilters.transportModes?.length > 0
      ? pois.filter((poi: IMarker) => poiFilterCat.includes(parseInt(poi.data?.poiCategory)))
      : pois; */

    markers = [...markers, ...stops/* , ...pois */];
    console.log('[Home Screen] - GET MARKERS < 16 - ' + markers.length);

    let idIcons: Array<number> = [];
    markers.forEach((marker: IMarker) => {
      !idIcons.includes(marker.data?.icons?.iconMarkTransportId) &&
        marker.data?.icons?.iconMarkTransportId !== undefined &&
        idIcons.push(marker.data?.icons?.iconMarkTransportId) && 
        marker.data?.icons?.iconMarkFavTransportId !== undefined &&
        idIcons.push(marker.data?.icons?.iconMarkFavTransportId);

      !idIcons.includes(marker.data?.icons?.iconMarkId) &&
      marker.data?.icons?.iconMarkId > 0 &&
      marker.data?.icons?.iconMarkId !== undefined &&
      idIcons.push(marker.data?.icons?.iconMarkId);
    });

    const idIconsFiltered = idIcons.filter(
      (id) => selectorIcons.filter((icon) => icon.id === id).length === 0,
    );

    await Promise.all(
      idIconsFiltered.map((id) => {
        return GetIcons(id);
      }),
    ).then((resultsPromise) => {
      resultsPromise.forEach((result) => {
        dispatch(updateIcon(result.data));
      });
      dispatch(updateMarkers(markers));

    });
    
    return markers;
  }

  return {
    getMarkers,
    renderVisualizerMarkers,
  }
}
