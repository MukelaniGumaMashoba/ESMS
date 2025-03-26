import { Text } from '@/components/custom'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, StyleSheet, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

type ScheduleProps = {
    name: string;
    status: boolean;
}

function Schedule() {
    const [name, setName] = React.useState<string>('')
    const [status, setStatus] = React.useState<boolean>(false)


    const deleteTask = () => {
        console.log("Task Deleted");
    }

    const doneTask = () => {
        console.log("Task Done")
    }


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="dark-content" // Sets the text color to light
                    backgroundColor="white" // Sets the background color
                    translucent={false} // Makes the status bar opaque
                />

                <View style={{ margin: 10 }}>
                    <Text style={{ fontFamily: "Roboto-Regular", fontSize: 20, textAlign: "center", marginBottom: 10 }}>To Dos</Text>
                    <View>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder="Enter Name"
                                style={{ width: "90%", fontFamily: "Roboto-Regular" }}
                            />
                            <TouchableOpacity>
                                <Ionicons name="add-circle-outline" size={24} color="grey" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.doneContainer}>
                            <Text style={styles.textDone}>Task</Text>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center",marginTop: 10 }}>
                                <Text>- Study C++</Text>
                                <TouchableOpacity onPress={deleteTask}>
                                    <Ionicons name="trash-outline" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
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
    },
    textOnprogress: {
        fontFamily: "Roboto-Regular",
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#B2F7EF",
        borderRadius: 20,
        padding: 5
    },
    textDone: {
        fontFamily: "Roboto-Regular",
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#A8E0B7",
        borderRadius: 20,
        padding: 5
    },
    textInput: {
        fontFamily: "Roboto-Regular",
        borderWidth: 2,
        borderRadius: 20,
        padding: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "lightgrey",
    },
    doneContainer: {
        marginBottom: 10,
        backgroundColor: "#A8F387",
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
    },
    onProgressContainer: {
        marginBottom: 10,
        backgroundColor: "#16D6FA",
        borderRadius: 20,
        padding: 10,
        marginVertical: 10,
    },

})