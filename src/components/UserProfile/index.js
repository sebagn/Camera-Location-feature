import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageSelector from '../ImageSelector';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../utils/constants';
import {saveProfile} from '../../store/actions/auth.actions';

const UserProfile = () => {
  const profile = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  useEffect(() => {
    setImage(profile.image);
    setName(profile.name);
  }, []);

  const handleSaveProfile = () => {
    dispatch(saveProfile(profile.user, name, image));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.name}
        onChangeText={setName}
        value={name}
        placeholder="Escribi tu nombre"
      />
      <ImageSelector
        onImage={setImage}
        shape="rounded"
        profilePicture={profile.profilePicture}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Guardar perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: COLORS.DARK_SIENNA,
  },
  nameContainer: {
    flex: 0.3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    textAlign: 'center',
  },
  saveButton: {
    flex: 0.1,
    width: 150,
    backgroundColor: COLORS.BLUSH,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default UserProfile;
