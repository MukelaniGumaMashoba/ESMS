import React from 'react'
import { Text, View, StyleSheet } from 'react-native'



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
        // flex: 1,
        flexDirection: "column",
        marginHorizontal: 10,
        padding: 8,
        backgroundColor: 'grey',
        borderRadius: 20,
        borderColor: "grey",
        borderWidth: 4,
        justifyContent: "space-between",
        gap: 2,
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
        backgroundColor: "grey",
        borderRadius: 20,
        padding: 10,
        margin: 5,
    },
    secContainer: {
        backgroundColor: "white"
    },
    thirContainer: {
        backgroundColor: "lightblue",
    },
    forContainer: {
        backgroundColor: "lightgreen",
    },
    // subjectText: {

    // },
})