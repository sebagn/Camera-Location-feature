import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const PlaceDetailScreen = ({route}) => {
    
    console.log(route.params)
    return (
        <View style={styles.container}>
            <Text>Detalle Direccion</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PlaceDetailScreen
