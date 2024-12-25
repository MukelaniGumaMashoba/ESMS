import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'

function HeaderContainer() {
    return (
        <View style={styles.topContainer}>
            <View style={styles.nameContainer}>
                <Text>Hello, Mukelani</Text>
                <Text><Ionicons name='trophy' size={10} ></Ionicons>Student</Text>
            </View>
            <View>
                <Image
                    source={require('../../assets/images/icon.png')}
                    style={styles.reactLogo}
                />
            </View>
        </View>
    )
}

export default HeaderContainer

const styles = StyleSheet.create({
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "lightblue",
        padding: 9,
        borderRadius: 20,
    },
    nameText: {

    },
    nameContainer: {
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 20,
    }, reactLogo: {
        width: 50,
        borderRadius: 25,
        height: 50,

    },
})