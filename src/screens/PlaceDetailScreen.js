import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../utils/constants';

const PlaceDetailScreen = ({route}) => {
  const place = useSelector(state =>
    state.places.places.find(place => place.id === route.params.id),
  );
  return (
    <View style={styles.container}>
      <Image source={{uri: place.image}} style={styles.image} />
      <View style={styles.details}>
        {/* <Text style={styles.title}>{place.title}</Text> */}
        {/* <Text style={styles.direccion}>Direccion:</Text> */}
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    elevation: 3,
    margin: 20,
    borderRadius: 5,
  },
  details: {
    flex: 0.1,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    color: COLORS.DARK_SIENNA,
    textAlign: 'center',
  },
  direccion: {
    fontSize: 18,
    color: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  address: {
    color: 'black',
  },
});

export default PlaceDetailScreen;
