import { updatePermissionGeolocation } from '@src/redux/slices/permissionSlice';
import { IIncidence } from '@src/types/interfaces';
import { getRequestPermissionsLocation, permissionsWithGpsDialog } from '@src/utils/Permissions';
import { INCIDENCES_LIST, INCIDENCES_NUM } from '@src/utils/constants';
import { getStorage } from '@src/utils/utils';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MMKV } from 'react-native-mmkv';



const Precarga = ({ onFinish, children }) => {

  const dispatch = useDispatch();
  const storage = new MMKV();

  //const storage = new MMKV();

  console.log('[Precarga]');

  const precarga = () => {
    onFinish(true);
  };

  async function permissions() {
    const result = await getRequestPermissionsLocation();
    dispatch(updatePermissionGeolocation(result));
    if (result === 'granted') {
      await permissionsWithGpsDialog();
    }

    const listIncidences = getStorage(INCIDENCES_LIST);
    const hoy = new Date();
    const hoyString = String(hoy.getDate()).padStart(2, '0') + '/' + String(hoy.getMonth() + 1).padStart(2, '0') + '/' + String(hoy.getFullYear());
    console.log('listIncidences');
    console.log(listIncidences);
    const incidencesFiltered = listIncidences.filter((incidence: IIncidence) => incidence.data === hoyString);
    console.log('incidencesFiltered');
    console.log(incidencesFiltered);
    const itemStorageNum = {
      numIncidencesToday: incidencesFiltered.length,
    };
    storage.set(INCIDENCES_NUM,  JSON.stringify(itemStorageNum));


    setTimeout(()=> {precarga();}, 3000);
  }

  useEffect(() => {
    console.log('[Precarga] - useEffect');
    permissions();
    //obtiene la configuración de idioma local del calendario
  }, []);


  return <>{children}</>;
};

export default Precarga;
