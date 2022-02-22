import React, {useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PlaceItem from '../components/PlaceItem/index';
import auth from '@react-native-firebase/auth';
import UserProfile from '../components/UserProfile';

const PlaceListScreen = ({navigation}) => {
  const places = useSelector(state => state.places.places);
  const user = useSelector(state => state.auth.user);

  const onSelectDetail = item => {
    navigation.navigate('Detalle', {
      title: item.title,
      id: item.id,
    });
  };

  const renderItem = ({item}) => (
    <PlaceItem
      title={item.title}
      image={item.image}
      address={item.address}
      onSelect={() => onSelectDetail(item)}
    />
  );

  return (
    <View style={styles.container}>
      <UserProfile 
        style={styles.profile}
      />
      <FlatList
        style={styles.list}
        data={places}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    flex: 1,
    fontSize: 30,
  },
  list: {
    flex: 0,
    flexShrink: 1,
  },
});

export default PlaceListScreen;
