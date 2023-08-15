import { useNavigation } from '@react-navigation/native';
import BottomButton from '@src/components/commons/bottomButton/BottomButton';
import Button from '@src/components/commons/button/Button';
import Header from '@src/components/commons/header/Header';
import { useTranslate } from '@src/context/languageContext';
import { updateErrorMessage, updateShowLoading } from '@src/redux/slices/contextualSlice';
import { updateIncidence } from '@src/redux/slices/incidenceSlice';
import { ILocation } from '@src/types/interfaces';
import { DEBUG_MODE, navigationPages } from '@src/utils/constants';
import { getRegionDeltasFromZoom } from '@src/utils/utils';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
//import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { useDispatch } from 'react-redux';



export default function ReportMapScreen() {
  //const [selectedLocation, setSelectedLocation] = useState(null) as any;
  const navigation =  useNavigation() as any;
  const dispatch = useDispatch();
  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const t = useTranslate();

  let timeoutRef = null as any;

  /*const widthDevice = Dimensions.get('window').width;

  const handleLocationSelect = (data, details) => {
    console.log('handleLocationSelect');
    const { lat, lng } = details.geometry.location;
    setSelectedLocation({ latitude: lat, longitude: lng });
  };*/

  const gotoBack = () => {
    navigation.navigate(navigationPages.reportPhoto);
  };

  const onRegionChangeComplete = (region: any) => {
    console.log('onRegionChangeComplete');
    // Limpiamos el timeout existente para evitar llamadas innecesarias
    if (timeoutRef) {
      clearTimeout(timeoutRef);
    }

    // Creamos un nuevo timeout que actualiza la posición del marcador después de 500ms
    timeoutRef = setTimeout(() => {
      // Obtener las coordenadas del centro del mapa
      const { latitude, longitude } = region;
      // Actualizar la posición del marcador
      setMarkerPosition({ latitude, longitude });
    },10);
  };

  const onMapLoaded = () => {
    // Actualizar la posición del marcador
    setMarkerPosition({ latitude: 38.961720, longitude:-0.192369 });
  };


  const isLocationWithinArea = (latitude: any, longitude: any) => {
    // Aquí define los cuatro puntos que forman el área (latitud y longitud)
    const point1 = { latitude: 38.961955, longitude: -0.198071 };
    const point2 = { latitude: 38.968646, longitude: -0.192578 };
    const point3 = { latitude: 38.960771, longitude: -0.183351 };
    const point4 = { latitude: 38.953646, longitude: -0.191334 };

    // Comprueba si la ubicación está dentro del área formada por los cuatro puntos
    const isWithinArea =
      latitude >= Math.min(point1.latitude, point2.latitude, point3.latitude, point4.latitude) &&
      latitude <= Math.max(point1.latitude, point2.latitude, point3.latitude, point4.latitude) &&
      longitude >= Math.min(point1.longitude, point2.longitude, point3.longitude, point4.longitude) &&
      longitude <= Math.max(point1.longitude, point2.longitude, point3.longitude, point4.longitude);

    return DEBUG_MODE ? true :  isWithinArea;
  };



  const getAddressFromCoordinates = async ({latitude, longitude}: ILocation) => {
    console.log('getAddressFromCoordinates');

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);

      if (data.address) {
        const formattedAddress = `${data?.address?.road}, ${data?.address?.village ?? data?.address?.city}`;
        console.log(formattedAddress);
        const objectToSave = {
          address: formattedAddress,
        };
        dispatch(updateIncidence(objectToSave));
        console.log('navigate');
        navigation.navigate(navigationPages.confirm);
        dispatch(updateShowLoading(false));
      } else {
        const objectToSave = {
          addres: null,
        };

        dispatch(updateIncidence(objectToSave));
        console.log('navigate2');
        navigation.navigate(navigationPages.confirm);
        dispatch(updateShowLoading(false));
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      const objectToSave = {
        addres: null,
      };
      console.log('navigate3');
      dispatch(updateIncidence(objectToSave));
      navigation.navigate(navigationPages.confirm);
      dispatch(updateShowLoading(false));
    }
  };

  /*const getCurrentLocation = () => {
    dispatch(updateShowLoading(true));
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        if (isLocationWithinArea(latitude, longitude)) {
          const objectToSave = {
            location: {latitude: latitude, longitude: longitude} as ILocation,
          };
          dispatch(updateIncidence(objectToSave));
          getAddressFromCoordinates({latitude: latitude, longitude: longitude});
        } else {
          const resultadoMessage = t('malaUbicacio_reportMap');
          dispatch(updateErrorMessage(resultadoMessage));
          dispatch(updateShowLoading(false));
        }
      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };*/

  const getCurrentLocation = () => {
    dispatch(updateShowLoading(true));
    const latitude = markerPosition.latitude;
    const longitude = markerPosition.longitude;

    if (isLocationWithinArea(latitude, longitude)) {
      const objectToSave = {
        location: {latitude: latitude, longitude: longitude} as ILocation,
      };
      dispatch(updateIncidence(objectToSave));
      getAddressFromCoordinates({latitude: latitude, longitude: longitude});
    } else {
      const resultadoMessage = t('malaUbicacio_reportMap');
      dispatch(updateErrorMessage(resultadoMessage));
      dispatch(updateShowLoading(false));
    }
  };



  return (
    <View style={styles.container}>
      <Header title={t('indicans_reportMap')} step={3} back={gotoBack} close />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.961720,
          longitude: -0.192369,
          ...getRegionDeltasFromZoom(16, 38.961720),
        }}
        showsCompass={true}
        maxZoomLevel={25}
        minZoomLevel={10}
        onRegionChange={onRegionChangeComplete}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        onMapLoaded={onMapLoaded}
      >


      <Marker coordinate={markerPosition} />
      </MapView>
      <BottomButton>
        <Button text={t('utilitzar_reportMap')} onPress={getCurrentLocation} />
      </BottomButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    marginHorizontal: 10,
  },
});
