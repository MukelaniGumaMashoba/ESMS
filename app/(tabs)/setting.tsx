import HeaderContainer from '@/components/header'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function setting() {

    const HandleLogout = () => {
        console.log("Day 1 without wifi");

    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* top session */}
                <View>
                    <HeaderContainer />
                </View>

                <TouchableOpacity onPress={HandleLogout} style={styles.logoutBtn}>
                    <Text>Logout</Text>
                </TouchableOpacity>


                <Text>Settings</Text>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 10,
    },
    logoutBtn: {

    }
})