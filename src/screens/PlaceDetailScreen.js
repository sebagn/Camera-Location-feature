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
        <Text style={styles.address}>{place.address}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    background: rgb(2,0,36),
background: 'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,121,31,1) 35%, rgba(0,212,255,1) 100%)',
  },
  image: {
    flex: 1,
    margin: 20,
    borderRadius: 5,
  },
  details: {
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
    flex: 0.1,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
});

export default PlaceDetailScreen;
