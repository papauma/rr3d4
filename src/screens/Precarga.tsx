import Splash from '@src/screens/splash/components/splash/Splash';
import { getRequestPermissionsLocation, permissionsWithGpsDialog } from '@src/utils/Permissions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userState } from '@src/redux/slices/userSlice';
import { updatePermissionGeolocation } from '@src/redux/slices/permissionSlice';

const Precarga = ({ onFinish }) => {
  const userAccountInformation = useSelector(userState);
  const dispatch = useDispatch();


  console.log('[Precarga]');

  const precarga = () => {
    //inicializa la cache para el caso de la busqueda de recientes TO CHANGE
    console.log('getSearch from storage()');

    // CARGA PARADAS
    console.log('loading stops()');

    // CARGA DE TODOS LOS COMPONENTES DEL MAPA
    console.log('loading map components()');
  };

  async function permissions() {
    const result = await getRequestPermissionsLocation();
    dispatch(updatePermissionGeolocation(result));
    if (result === 'granted') {
      await permissionsWithGpsDialog();
    }
    setTimeout(() => {
      //onFinish(true);
    }, 10000);
  }


  useEffect(() => {
    console.log('[Precarga] - useEffect');
    permissions();
    if (userAccountInformation.tokenDevice) {
      if (userAccountInformation.bearerToken) {
        console.log('precarga');
        precarga();
      } else {
        console.log('fillInformationUser');
        //fillInformationUser();
      }
    } else {
      //checkToken();
    }
    //obtiene la configuración de idioma local del calendario
  }, [userAccountInformation.bearerToken, userAccountInformation.tokenDevice]);

  return <Splash />;
};

export default Precarga;
