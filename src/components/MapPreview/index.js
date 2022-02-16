import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {MAPS_KEY} from '../../constants/maps';

const MapPreview = ({location, style}) => {
  const {latitude, longitude} = location;
  const mapPreviewUrL = location
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=13&size=600x300&maptype=roadmap
    &markers=color:red%7C${latitude},${longitude}&key=${MAPS_KEY}`
    : '';
  return (
    <View style={{...styles.mapPreview, ...style}}>
      {location ? (
        <Image style={styles.mapImage} source={{uri: mapPreviewUrL}} />
      ) : (
        <Text>No hay ninguna ubicacion</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
});

export default MapPreview;
