import { filtersState } from '@src/redux/slices/filtersSlice';
import { transportModeState } from '@src/redux/slices/transportmodeSlices';
import { ITransportMode } from '@src/types/interfaces';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function useFiltersSearch() {
  const [transports, setTransports] = useState<Array<any>>([]);
  const [changed, setChanged] = useState<boolean>(false);
  const selectorTransportModes = useSelector(transportModeState);

  const filtersSelector = useSelector(filtersState);

  const [filtersTransportTemp, setFiltersTransportTemp] = useState<Array<any>>(
    !filtersSelector.transportModes ? [] : filtersSelector.transportModes,
  );
  
  const resetFiltersTemp = () => {
    setFiltersTransportTemp([]);
    setChanged(true);
  };

  useEffect(() => {

    function formatTransportModes() {
        let arrayTransportsPresent = [...selectorTransportModes]
        .filter((element) => element.id !== 90)
        .sort(function (itemA, itemB) {
          const order = {
            Metro: 0,
            Tranvia: 1,
            Bus: 2,
            Interbus: 3,
            Tren: 4,
            Bicicleta: 5,
            Intercambiador: 6,
          };

          return order[itemA.label] - order[itemB.label];
        });

        arrayTransportsPresent = arrayTransportsPresent.map((transport: ITransportMode) => {
            if (transport) {
               return {
                id: transport.id,
                title: transport.label,
                selected: filtersTransportTemp.findIndex((id) => id === transport.id) !== -1,
                iconId: transport.iconId,
                source: undefined,
                onPress: () => {
                    let filterTempsAux = [...filtersTransportTemp];
                    if (filterTempsAux.includes(transport.id)) {
                      filterTempsAux = filterTempsAux.filter((id) => id !== transport.id);
                    } else {
                      filterTempsAux.push(transport.id);
                    }
                    setChanged(true);
                    setFiltersTransportTemp(filterTempsAux);
                  },
               } 
            } else {
                return undefined
            }
        })

        return arrayTransportsPresent;
    }

    setTransports(formatTransportModes())

  }, [filtersTransportTemp, selectorTransportModes])

  return (
    [transports, changed, resetFiltersTemp, filtersTransportTemp] as const
  )
}
