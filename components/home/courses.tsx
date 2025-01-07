import React from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'



export default function Courses() {
    return (
        <View style={styles.container}>
            {/* 1st section */}
            <View style={styles.containers}>
                <View style={styles.firContainer}>
                    <Text style={styles.topText}>Mathematics</Text>
                    <Text style={styles.containerText}>Grade 12</Text>
                </View>
                {/* 2nd section */}
                <View style={styles.secContainer}>
                    <Text style={styles.topText}>Physical Science</Text>
                    <Text style={styles.containerText}>Grade 12</Text>
                </View>
            </View>


            <View style={styles.containers}>
                {/* 3rd section */}
                <View style={styles.thirContainer}>
                    <Text style={styles.topText}>Life Science</Text>
                    <Text style={styles.containerText}>Grade 12</Text>
                </View>
                {/* 4th section */}
                <View style={styles.forContainer}>
                    <Text style={styles.topText}>Geography</Text>
                    <Text style={styles.containerText}>Grade 12</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        padding: 10,
        backgroundColor: '#f5f7f5',
        borderRadius: 20,
        borderColor: "lightgrey",
        borderWidth: 1,
        justifyContent: "space-between",
        gap: 2,
        width: "100%",
        alignItems: "center",
    },
    topText: {
        fontSize: 12,
    },
    containerText: {
        fontSize: 18,
        color: "white"
    },
    containers: {
        flexDirection: "row"
    },
    firContainer: {
        backgroundColor: "#FEEA00",
        borderRadius: 20,
        padding: 10,
        margin: 5,
        width: "50%",
        height: Dimensions.get("window").height / 6,
    },
    secContainer: {
        backgroundColor: "#47e67c",
        borderRadius: 20,
        padding: 10,
        margin: 5,
        width: "50%",
        height: Dimensions.get("window").height / 6,
    },
    thirContainer: {
        backgroundColor: "lightblue",
        borderRadius: 20,
        padding: 10,
        margin: 5,
        width: "50%",
        height: Dimensions.get("window").height / 6,
    },
    forContainer: {
        backgroundColor: "#f7b320",
        borderRadius: 20,
        padding: 10,
        margin: 5,
        width: "50%",
        height: Dimensions.get("window").height / 6,
    },
    // subjectText: {

    // },
})