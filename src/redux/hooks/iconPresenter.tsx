import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { iconsSlices, iconsState } from '../slices/iconsSlices';
import { useLazyGetIconsQuery } from '../services/iconsServices';

export default function IconPresenter() {
  const dispatch = useDispatch();

  const iconsStore = useSelector(iconsState);

  const [GetIcons] = useLazyGetIconsQuery();

/*   async function getAgencyIcon(id: number) {
    let agencies = agency.agencysStore;
    if (!agencies.length)
      await GetAgency().then((response) => {
        dispatch(agencysSlices.actions.updateAgencys(response.data));
        agencies = response.data;
      });
    let agenciesFilter = agencies.find((icon) => icon.id === id);
    let res = await getIcon(agenciesFilter.icon);
    return res;
  } */

  async function getIcon(id: number) {
    let filter = iconsStore.find((icon) => icon.id === id);
    if (filter) {
      return filter.contentFile;
    } else {
      GetIcons(id).then((response: any) => {
        dispatch(iconsSlices.actions.updateIcon(response.data));
        return response.data.contentFile;
      });
    }
  }

  return {
    /* getAgencyIcon, */
    getIcon,
  };
}
