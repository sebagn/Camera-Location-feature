import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addPlace} from '../store/actions/places.actions';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';
import {COLORS} from '../utils/constants';

const NewPlaceScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState(null);

  const handleOnMapLocation = () => {
    navigation.navigate('Map', {
      location,
    });
  };

  const handleSave = () => {
    dispatch(addPlace(title, image, location));
    navigation.navigate('Direcciones');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Inserte el titulo del lugar"
        />
        <ImageSelector onImage={setImage} />
        <LocationSelector
          onLocation={setLocation}
          onMapLocation={handleOnMapLocation}
        />
        <Button
          title="Grabar dirección"
          color={COLORS.MAROON}
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.BLUSH,
  },
});

export default NewPlaceScreen;
