import { useLazySearchStopsQuery } from '@src/redux/services/stopsService';
import { searchSlice } from '@src/redux/slices/searchSlice';
import React from 'react'
import { useDispatch } from 'react-redux';
import IconPresenter from '../iconPresenter';

export default function useSearch() {
    const dispatch = useDispatch();
    const [SearchStops] = useLazySearchStopsQuery();
    const {getAgencyIcon} = IconPresenter()


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

  return {
    search
  }
}
