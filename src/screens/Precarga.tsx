import Splash from '@src/screens/splash/components/splash/Splash';
import { getRequestPermissionsLocation, permissionsWithGpsDialog } from '@src/utils/Permissions';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tokenDeviceUpdate, updateUserData, userState } from '@src/redux/slices/userSlice';
import { updatePermissionGeolocation } from '@src/redux/slices/permissionSlice';
import { useCreateUserAnonymousMutation } from '@src/redux/services/userService';
import { MMKV } from 'react-native-mmkv';
import { random } from '@src/utils/StringUtils';
import { useLazyGetAgencyQuery, useLazyGetDataOriginQuery } from '@src/redux/services/agencyService';
import { useLazyGetTransportModeQuery } from '@src/redux/services/transportmodeServices';
import { updateAgencys, updateDataOrigin } from '@src/redux/slices/agencysSlices';
import { updateTransportMode } from '@src/redux/slices/transportmodeSlices';
import { useLazyGetStopsQuery } from '@src/redux/services/stopsService';
import { formatStopMarkers } from '@src/utils/MarkersUtils';
import { updateStops } from '@src/redux/slices/stopsSlices';

const Precarga = ({ onFinish }) => {
  const userAccountInformation = useSelector(userState);
  const dispatch = useDispatch();
  const storage = new MMKV();
  const [createUserAnonymous, result] = useCreateUserAnonymousMutation();
  const [GetDataOrigin] = useLazyGetDataOriginQuery();
  const [GetTransportMode] = useLazyGetTransportModeQuery();
  const [GetAgency] = useLazyGetAgencyQuery();
  const [GetStops] = useLazyGetStopsQuery();
  


  console.log('[Precarga]');

  const precarga = () => {
    const promiseDataOrigin = GetDataOrigin();
  const promiseTransportMode = GetTransportMode();
  const promiseStops = GetStops();
  //const promiseLines = GetLines();
  const promiseAgency = GetAgency();
    //inicializa la cache para el caso de la busqueda de recientes TO CHANGE
    console.log('getSearch from storage()');

    //CARGA DE AGENCIAS Y ORIGENES DE DATOS
    Promise.all([promiseDataOrigin, promiseAgency, promiseTransportMode, promiseStops])
      .then((resultsPromise) => {
        if (resultsPromise.filter((response) => response.isSuccess).length < 4) {
          // TO DO POPUP ERROR
          console.log('errorPrecargaStopsAPP');
          // console.log('errorPrecargaStopsAPP', error);
          return false;
        }

        dispatch(updateDataOrigin(resultsPromise[0].data));
        dispatch(updateAgencys(resultsPromise[1].data));
        dispatch(updateTransportMode(resultsPromise[2].data))

        formatStopMarkers(resultsPromise[3].data, resultsPromise[0].data, (stops: any) => dispatch(updateStops(stops)));
      }).catch((e) => {

      }).finally(() => {
        onFinish(true);
      })

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
    /* setTimeout(() => {
      onFinish(true);
    }, 10000); */
  }

  async function checkIfExistUserAnon() {
    return Object.keys(JSON.parse(storage.getString('userAccountInformation') || '{}')).length > 0;
  }

  async function fillInformationUser() {
    //const tokenDevice = random();
    // TO DO getFingerPrint
    // const tokenDevice = await dispatch(userSliceFingerprint());

    if (await checkIfExistUserAnon()) {
      console.log('getUserLocalStorage');
      dispatch(updateUserData(JSON.parse(storage.getString('userAccountInformation') || '{}')));
    } else {
      console.log('createUserAnonymous');
      createUserAnonymous({
        ...userAccountInformation
      })
        .then((response) => {
          if ('data' in response) {
            storage.set(
              'userAccountInformation',
              JSON.stringify({
                ...userAccountInformation,
                ...response.data
              }),
            );
            dispatch(updateUserData(response.data));
          } else {
            // TO DO POPUP ERROR
            console.log('CreateUserAnonymousRequestError', response);
            // console.log('CreateUserAnonymousRequestError', response.error);
          }
        })
        .catch((error) => {
          // TO DO POPUP ERROR
          console.log('errorCreateUserAnonymousss');
          // console.log('errorCreateUserAnonymousss', error);
        });
    }
  }


  useEffect(() => {
    console.log('[Precarga] - useEffect');
    permissions();
    if (userAccountInformation.tokenDevice) {
      if (userAccountInformation.bearerToken) {
        console.log('precarga', userAccountInformation.bearerToken);
        precarga();
      } else {
        console.log('fillInformationUser');
        fillInformationUser();
      }
    } else {
      //checkToken();
      dispatch(tokenDeviceUpdate(random()))
    }
    //obtiene la configuración de idioma local del calendario
  }, [userAccountInformation.bearerToken, 
      userAccountInformation.tokenDevice, userAccountInformation.languageId]);

  return <Splash />;
};

export default Precarga;
