import Geolocation from '@react-native-community/geolocation';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {COLORS} from '../utils/constants';
import {useGetPosition} from '../utils/hooks/useGetPosition';

const MapScreen = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      useGetPosition(initialRegion, setInitialRegion);
    };
    fetchData();
  }, []);

  const handleSelectLocation = event => {
    setSelectedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      navigation.navigate('Nuevo', {
        mapLocation: selectedLocation,
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSaveLocation}>
          <Text style={styles.headerButton}>Guardar</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, handleSaveLocation]);

  return (
    <>
      {initialRegion ? (
        <MapView
          style={styles.container}
          region={initialRegion}
          onPress={handleSelectLocation}>
          {selectedLocation && (
            <Marker
              title="Ubicacion seleccionada"
              coordinate={selectedLocation}
            />
          )}
        </MapView>
      ) : (
        <View style={styles.container}>
          <Text style={styles.loading}> Cargando mapa... </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerButton: {
    backgroundColor: COLORS.LIGTH_PINK,
    fontSize: 16,
    color: COLORS.DARK_SIENNA,
    padding: 5,
    borderRadius: 4,
  },
  loading: {
    fontSize: 24,
  },
});

export default MapScreen;
