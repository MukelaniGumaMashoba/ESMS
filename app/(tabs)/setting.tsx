import HeaderContainer from '@/components/header'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { ImageBackground, Linking, Platform, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function setting() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // Was started on 25/12/2024
    const HandleLogout = () => {
        console.log("Day 1 without wifi");
    }

    const sendWhatsApp = () => {
        let msg = "type something";
        let phoneWithCountryCode = "xxxxxxxxxx";

        let mobile =
            Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
        if (mobile) {
            if (msg) {
                let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
                Linking.openURL(url)
                    .then(data => {
                        console.log("WhatsApp Opened");
                    })
                    .catch(() => {
                        alert("Make sure WhatsApp installed on your device");
                    });
            } else {
                alert("Please insert message to send");
            }
        } else {
            alert("Please insert mobile no");
        }
    };


    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                {/* top session */}
                <View>
                    <HeaderContainer />
                </View>

                <View style={styles.banner}>
                    <ImageBackground source={require("../../assets/pictures/img3.jpg")} style={{ width: '100%', height: 200, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.photoContainer}>
                            <Text style={{ color: "white", fontWeight: "300", fontSize: 18, fontFamily: "Roboto-Regular" }}>Let's Learn Together</Text>
                        </View>
                    </ImageBackground>
                </View>


                <View>
                    {/* Appearance */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Ionicons name='settings-outline' size={30} color={"lightblue"} />
                        <View>
                            <Text>Appearance</Text>
                            <Text>Make your app experience your own by customizing your profile</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name='arrow-forward-outline' size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Privacy */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Ionicons name='settings-outline' size={30} color={"purple"} />
                        <View>
                            <Text>Dark Mode</Text>
                            <Text>Automatic</Text>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>

                    {/* Dark Mode */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Ionicons name='finger-print-sharp' size={30} color={"orange"} />
                        <View>
                            <Text>Privacy</Text>
                            <Text>Check all our privacy policy</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name='arrow-forward-outline' size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* About */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Ionicons name='information-sharp' size={30} color={"purple"} />
                        <View>
                            <Text>About</Text>
                            <Text>Learn more about us as MGM Group and ESMS</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name='arrow-forward-outline' size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Send Feedbacks */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Ionicons name='chatbubble-sharp' size={30} color={"green"} />
                        <View>
                            <Text>Send Feedback</Text>
                            <Text>Let us know how can we make ESMS better</Text>
                        </View>
                        <TouchableOpacity onPress={sendWhatsApp}>
                            <Ionicons name='arrow-forward-outline' size={24} />
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Account Section still workings*/}
                <Text>Account</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={HandleLogout} style={styles.logoutBtn}>
                        <Ionicons name='arrow-forward-outline' size={24} />
                        <Text>Sign Out</Text>
                    </TouchableOpacity>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Ionicons name='return-up-forward-outline' size={24} color='black' />
                    <Text>Change Email</Text>
                    <TouchableOpacity>
                        <Ionicons name='arrow-forward-outline' size={24} color='black' />
                    </TouchableOpacity>
                </View>



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

    },
    banner: {
        // flexDirection: 'row',
        // justifyContent: 'space-evenly',
        alignItems: 'center',
        marginBottom: 40,
    },
    photoContainer: {
        // backgroundColor: 'lightgrey',
        padding: 5,
        borderRadius: 20,
        height: "20%",
        width: "100%",
    },

})