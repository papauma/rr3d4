import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import { navigationPages } from '@src/utils/constants';
import Button from '@src/components/commons/button/Button';
import { calcZoomMobile, getRegionDeltasFromZoom } from '@src/utils/utils';
import Header from '@src/components/commons/header/Header';
import BottomButton from '@src/components/commons/bottomButton/BottomButton';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch } from 'react-redux';
import { updateIncidence } from '@src/redux/slices/incidenceSlice';
import { ILocation } from '@src/types/interfaces';
import { updateShowLoading } from '@src/redux/slices/contextualSlice';


export default function ReportMapScreen() {
  const [selectedLocation, setSelectedLocation] = useState(null) as any;
  const navigation =  useNavigation() as any;
  const dispatch = useDispatch();
  const widthDevice = Dimensions.get('window').width;

  const handleLocationSelect = (data, details) => {
    const { lat, lng } = details.geometry.location;
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const gotoBack = () => {
    navigation.navigate(navigationPages.reportPhoto);
  };

  const onRegionChangeComplete = (region) => {

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
        const formattedAddress = `${data?.address?.road}, ${data?.address?.village}`;
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

  const getCurrentLocation = () => {
    dispatch(updateShowLoading(true));
    Geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const objectToSave = {
          location: {latitude: latitude, longitude: longitude} as ILocation,
        };
        dispatch(updateIncidence(objectToSave));
        getAddressFromCoordinates({latitude: latitude, longitude: longitude});

      },
      error => {
        console.log(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Indica'ns la ubicació" step={3} back={gotoBack} close />
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
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
          />
        )}
      </MapView>
      {/*<GooglePlacesAutocomplete
        placeholder="Buscar dirección"
        onPress={handleLocationSelect}
        query={{
          key: 'YOUR_GOOGLE_PLACES_API_KEY',
          language: 'es',
        }}
        styles={autocompleteStyles}
      />*/}
      <BottomButton>
        <Button text="Utilitzar aquesta ubicació" onPress={getCurrentLocation} />
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

const autocompleteStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 46,
    left: 16,
    right: 16,
    borderColor: 'black',
    borderWidth: 1,
    padding: 0,
    borderRadius: 6,
    color: 'black',
    margin: 0,
    opacity: 0.7,
  },
  listView: {
    backgroundColor: 'white',
  },
});
