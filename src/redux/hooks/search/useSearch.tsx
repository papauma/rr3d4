import { useLazySearchStopsQuery } from '@src/redux/services/stopsService';
import { searchSlice } from '@src/redux/slices/searchSlice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import IconPresenter from '../iconPresenter';
import { lineState } from '@src/redux/slices/linesSlices';
import { ILine } from '@src/types/ExploreInterfaces';
import { updateMarkerSelected } from '@src/redux/slices/mapSlice';
import { useNavigation } from '@react-navigation/native';
import { IMarker } from '@src/types/interfaces';
import { plannerSegmentsSlice } from '@src/redux/slices/plannerSegmentsSlice';
import { contextualSlice } from '@src/redux/slices/contextualSlice';
import InfoMapUtils from '@src/utils/InfoMapUtils';

export default function useSearch() {
    const dispatch = useDispatch();
    const [SearchStops] = useLazySearchStopsQuery();
    const allLines = useSelector(lineState);
    const {getAgencyIcon} = IconPresenter()
    const navigation = useNavigation();


    async function search(txt: string) {
        let res;
        dispatch(searchSlice.actions.updateLoadingAll(undefined));
    
        /* dispatch(searchSlice.actions.resetAll()); */
    
        SearchStops(txt)
          .then(async (response: any) => {
            res = JSON.parse(JSON.stringify(response.data));
            for (let element in response.data) {
              try {
                res[element].icon = await getAgencyIcon(response.data[element].agencyOriginId);
              } catch (e) {}
            }

            res = res.slice(0, 5);
            dispatch(searchSlice.actions.updateStops(res));
          })
          .catch((e) => {})
          .finally(() => {
            let foundLines = allLines.find((line: ILine) => 
              line.name.toLowerCase().includes(txt.toLowerCase()) || line.code.includes(txt.toLowerCase()));

            if (foundLines?.length > 2) {
              foundLines = foundLines.slice(0, 3)
            }
            if (foundLines) {
              dispatch(searchSlice.actions.updateLines(foundLines));
            } 
            dispatch(searchSlice.actions.updateLoadingStops(false));
          });
    
        /* SearchDirections(txt)
          .then(async (response: any) => {
            res = JSON.parse(JSON.stringify(response.data));
            dispatch(searchSlice.actions.updateDirections(res));
          })
          .catch((e) => {})
          .finally(() => {
            dispatch(contextualSlice.actions.updateShowLoading(false));
            dispatch(searchSlice.actions.updateLoadingDirections(false));
          });
    
          SearchPois(txt)
          .then(async (response: any) => {
            res = JSON.parse(JSON.stringify(response.data));
            res = res.slice(0, 5);
            dispatch(searchSlice.actions.updatePois(res));
          })
          .catch((e) => {})
          .finally(() => {
            dispatch(contextualSlice.actions.updateShowLoading(false));
            dispatch(searchSlice.actions.updateLoadingPois(false));
          }); */
      }
  
  /**
   * @function onSearchPressInScreen sustituye la logica que se podría pasar por props a la
   * pantalla de búsqueda al presionar sobre un resultado de búsqueda
   */
  function onSearchPressInScreen(screen: string, result: IMarker, params?: any) {
    if (screen === 'Planner') {
      dispatch(
        plannerSegmentsSlice.actions.set({ index: params.index, stop: result, overwrite: false }),
      );
      navigation.goBack();
    } else {
      dispatch(updateMarkerSelected(result));
      navigation.goBack();
    }
  }

  const searchLocationFromApi = async (latitude: any, longitude: any) => {
    //To Change
    dispatch(contextualSlice.actions.updateShowLoading(true));
    try {
      //const result: any = await SearchByCoords(`${latitude},${longitude}`);

      dispatch(contextualSlice.actions.updateShowLoading(false));

      /* if (result.data) {
        console.log('[Direction]', result.data);

        return InfoMapUtils.parseNoraDirectionToMarker(result.data[0]);
      } */
    } catch (e) {}

    return InfoMapUtils.getInfoLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };

  /**
   * @function onLocation recibe una latitud y longitud y busca
   * la dirección asociada a ese punto
   *  */
  const onLocation = async (latitude: any, longitude: any) => {
    const result: any = await searchLocationFromApi(latitude, longitude);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(result);
      }, 1500);
    });
  };

  return {
    search,
    onSearchPressInScreen,
    onLocation,
  }
}
