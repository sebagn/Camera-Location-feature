import RNFS from 'react-native-fs';
import {MAPS_KEY} from '../constants/maps';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${MAPS_KEY}`,
    );
    if (!response.ok) throw new Error('No se ha podido obtener la direccion');

    const resData = await response.json();
    if (!resData.results)
      throw new Error('No se ha podido obtener la direccion');

    const address = resData.results[0].formatted_address;

    const fileName = image.split('/').pop();
    const Path = `file:///${RNFS.DocumentDirectoryPath}/${fileName}`;
    try {
      await RNFS.copyFile(image, Path);
      dispatch({
        type: ADD_PLACE,
        payload: {
          title,
          image: Path,
          address,
          latitude: location.latitude,
          longitude: location.longitude,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
};
