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
import {addPlace} from '../store/places.actions';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';
import {COLORS} from '../constants';

const NewPlaceScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [location, setLocation] = useState(null);

  const handleTitleChange = text => setTitle(text);

  const handleSave = () => {
    dispatch(addPlace(title, image, location));
    navigation.navigate('Direcciones');
  };

  const handleOnImage = uri => {
    setImage(uri);
  };

  const handleOnLocation = position => {
    setLocation(position);
  };
  const handleOnMapLocation = () => {
    navigation.navigate('Map', {
      location: location,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Titulo</Text>
        <ImageSelector onImage={handleOnImage} />
        <LocationSelector
          onLocation={handleOnLocation}
          onMapLocation={handleOnMapLocation}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleTitleChange}
          value={title}
        />
        <Button
          title="Grabar dirección"
          color={COLORS.MAROON}
          onPress={() => handleSave()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default NewPlaceScreen;
