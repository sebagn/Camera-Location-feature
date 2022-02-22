import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import ImageSelector from '../ImageSelector';

const UserProfile = () => {
  const [image, setImage] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.name}> Nombre de usuario</Text>
      <View style={styles.image}>
        <ImageSelector onImage={setImage} shape='rounded' />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 10,
  },
  image: {
    flex: 1,
    borderRadius: 10000,
  },
});

export default UserProfile;
