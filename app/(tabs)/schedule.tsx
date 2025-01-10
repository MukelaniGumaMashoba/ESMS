import { Text } from '@/components/custom'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

function Schedule() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="dark-content" // Sets the text color to light
                    backgroundColor="white" // Sets the background color
                    translucent={false} // Makes the status bar opaque
                />


                <View>
                    <Text style={{ fontFamily: "Roboto-Regular" }}>To Dos</Text>
                </View>
           
           
            </SafeAreaView>
        </SafeAreaProvider>

    )
}

export default Schedule


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        gap: 10,
    },

})