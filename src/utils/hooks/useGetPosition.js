import Geolocation from '@react-native-community/geolocation';

export const useGetPosition = (state, setState) => {
  Geolocation.getCurrentPosition(
    position => {
      const {latitude, longitude} = position.coords;
      const location = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setState(location);
    },
    error => {
      console.warn(error);
      Alert.alert(
        'Could not fetch location',
        'Please enable location services and try again',
        [{text: 'Okay'}],
      );
    },
    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 10000,
      forceRequestLocation: true,
      showLocationDialog: true,
    },
  );
  return state;
};
