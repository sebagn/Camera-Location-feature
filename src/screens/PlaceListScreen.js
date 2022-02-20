import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import PlaceItem from '../components/PlaceItem/index';

const PlaceListScreen = ({navigation}) => {
  const places = useSelector(state => state.places.places);

  const onSelectDetail = (item) => {
    navigation.navigate('Detalle', {
      title: item.title,
      id: item.id
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
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={renderItem}
    />
  );
};

export default PlaceListScreen;
