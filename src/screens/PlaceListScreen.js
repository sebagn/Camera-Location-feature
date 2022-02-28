import React, {useEffect} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PlaceItem from '../components/PlaceItem/index';
import UserProfile from '../components/UserProfile';
import {loadProfile} from '../store/actions/auth.actions';
import {loadPlaces} from '../store/actions/places.actions';

const PlaceListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    dispatch(loadPlaces());
    dispatch(loadProfile(user));
  }, []);

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
      <UserProfile style={styles.profile} />
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
  },
  list: {
    flex: 1,
  },
});

export default PlaceListScreen;
