import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { COLORS } from '../../utils/constants';

const ImageSelector = ({ onImage }) => {
    const [pickerResponse, setPickerResponse] = useState();
    const IS_IOS = Platform.OS === 'ios';

    const handleTakePicture = async () => {
        const options = {
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false,
        }

        let granted;

        if(IS_IOS) {
            granted = await request(PERMISSIONS.IOS.CAMERA);
        } else {
            granted = await request(PERMISSIONS.ANDROID.CAMERA);
        }

        if(granted === RESULTS.GRANTED) {
            launchCamera(options, (res) => {
                if(!res.didCancel && !res.error) {
                    setPickerResponse(res.assets[0]);
                    onImage && onImage(res.assets[0].uri);
                }
            })
        } else {
            console.warn('Permission denied')
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.preview}>
                {!pickerResponse ? (<Text style={styles.text}>No hay una imagen seleccionada</Text>) : (
                    <Image style={styles.image} source={{ uri: pickerResponse.uri }} />
                )}
            </View>
            <Button title="tomar foto" color={COLORS.LIGTH_PINK} onPress={handleTakePicture} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    preview: {
        justifyContent: 'center',
        width: '100%',
        height: 200,
        marginBottom: 10,
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
        borderRadius: 5,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    text: {
        textAlign: 'center',
    }
});

export default ImageSelector;