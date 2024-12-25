import HeaderContainer from '@/components/header'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function setting() {

    const HandleLogout = () => {
        console.log("Day 1 without wifi");

    }


    return (
        <View>
            {/* top session */}
            <View>
                <HeaderContainer />
            </View>

            <TouchableOpacity onPress={HandleLogout} style={styles.logoutBtn}>
                <Text>Logout</Text>
            </TouchableOpacity>


            <Text>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    logoutBtn: {
        
    }
})