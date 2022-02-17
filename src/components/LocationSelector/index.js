import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Alert, Button} from 'react-native';
import {COLORS} from '../../constants';
import MapPreview from '../MapPreview/index';
import {useRoute} from '@react-navigation/native';
import {useGetPosition} from '../../constants/useGetPosition';
import Geolocation from '@react-native-community/geolocation';

const LocationSelector = ({onLocation, onMapLocation}) => {
  const [pickedLocation, setPickedLocation] = useState('');
  const route = useRoute();
  const mapLocation = route?.params?.mapLocation;

  useEffect(() => {
    if (mapLocation) {
      setPickedLocation(mapLocation);
      onLocation(mapLocation);
    }
  }, [mapLocation]);

  const handleGetLocation = () => {
    const fetchData = async () => {
      useGetPosition(pickedLocation, setPickedLocation);
    };
    fetchData();
    onLocation(pickedLocation);
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
        <Button
          title="Seleccionar ubicación"
          color={COLORS.PEACH_PUFF}
          onPress={handleGetLocation}
        />
        <Button
          title="Elegir del mapa"
          color={COLORS.LIGTH_PINK}
          onPress={handlePickOnMap}
        />
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
    marginBottom: 10,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: COLORS.BLUSH,
    borderWidth: 1,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LocationSelector;
