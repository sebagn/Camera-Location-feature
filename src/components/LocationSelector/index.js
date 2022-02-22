import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../utils/constants';
import MapPreview from '../MapPreview/index';
import {useRoute} from '@react-navigation/native';
import {useGetPosition} from '../../utils/hooks/useGetPosition';
import Geolocation from '@react-native-community/geolocation';

const LocationSelector = ({onLocation, onMapLocation}) => {
  const [pickedLocation, setPickedLocation] = useState('');
  const route = useRoute();
  const mapLocation = route?.params?.mapLocation;

  useEffect(() => {
    if (!!mapLocation) {
      setPickedLocation(mapLocation);
      onLocation(mapLocation);
    } else if (!!pickedLocation) {
      onLocation(pickedLocation);
    }
  }, [mapLocation, pickedLocation]);

  const handleGetLocation = () => {
    const fetchData = async () => {
      useGetPosition(pickedLocation, setPickedLocation);
    };
    fetchData();
  };

  const handlePickOnMap = () => {
    handleGetLocation();
    onMapLocation();
  };

  return (
    <View style={styles.container}>
      <MapPreview location={pickedLocation} style={styles.preview}>
        <Text>No hay una ubicación seleccionada</Text>
      </MapPreview>
      <View style={styles.action}>
        <TouchableOpacity title="">
          <Text onPress={handleGetLocation} style={styles.button}>
            Seleccionar ubicación
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text onPress={handlePickOnMap} style={styles.button}>
            Elegir en el mapa
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: COLORS.BLUSH,
    borderWidth: 1,
    borderRadius: 5,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: COLORS.LIGTH_PINK,
    padding: 10,
    borderRadius: 3,
    width: '100%',
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LocationSelector;
