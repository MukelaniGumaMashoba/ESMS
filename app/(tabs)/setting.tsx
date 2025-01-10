import HeaderContainer from '@/components/header'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { ImageBackground, Linking, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function setting() {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    // Was started on 25/12/2024
    const HandleLogout = () => {
        console.log("Day 1 without wifi");
    }

    const sendWhatsApp = () => {
        let msg = "Hello, I am sending the feddback from the ESMS app I enjoy it so much";
        let phoneWithCountryCode = "+27 638619542";

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

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, gap: 10, marginBottom: 10 }}>
                    <View style={styles.banner}>
                        <ImageBackground source={require("../../assets/pictures/img2.png")} style={{ width: '100%', height: 240, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                            <View style={styles.photoContainer}>
                                <Text style={{ color: "white", fontWeight: "300", fontSize: 18, fontFamily: "Roboto-Regular" }}>Let's Learn Together</Text>
                            </View>
                        </ImageBackground>
                    </View>


                    <View>
                        {/* Appearance */}
                        <View style={styles.appearance}>
                            <Ionicons name='settings-outline' size={30} color={"lightblue"} />
                            <View>
                                <Text>Appearance</Text>
                                <Text>Make these app yours</Text>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name='arrow-forward-circle-outline' size={24} color={"grey"} />
                            </TouchableOpacity>
                        </View>

                        {/* Privacy */}
                        <View style={styles.appearance}>
                            <Ionicons name='settings-outline' size={30} color={"purple"} />
                            <View>
                                <Text>Dark Mode</Text>
                                <Text>Light or dark mode</Text>
                            </View>
                            <Switch
                                trackColor={{ false: '#767577', true: '#B4F8C8' }}
                                thumbColor={isEnabled ? '#B4F8C8' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                        {/* Dark Mode */}
                        <View style={styles.appearance}>
                            <Ionicons name='finger-print-sharp' size={34} color={"orange"} />
                            <View>
                                <Text>Privacy</Text>
                                <Text>Check our privacy policy</Text>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name='arrow-forward-circle-outline' size={24} color={"grey"} />
                            </TouchableOpacity>
                        </View>

                        {/* About */}
                        <View style={styles.appearance}>
                            <Ionicons name='information-circle-sharp' size={37} color={"purple"} />
                            <View>
                                <Text>About</Text>
                                <Text>MGM Group and ESMS</Text>
                            </View>
                            <TouchableOpacity>
                                <Ionicons name='arrow-forward-circle-outline' size={24} color={"grey"} />
                            </TouchableOpacity>
                        </View>

                        {/* Send Feedbacks */}
                        <View style={styles.appearance}>
                            <Ionicons name='chatbubble-ellipses-sharp' size={30} color={"lightgreen"} />
                            <View>
                                <Text>Send Feedback</Text>
                                <Text>Tell us your experience</Text>
                            </View>
                            <TouchableOpacity onPress={sendWhatsApp}>
                                <Ionicons name='arrow-forward-circle-outline' size={24} color={"grey"} />
                            </TouchableOpacity>
                        </View>
                    </View>


                    {/* Account Section still workings*/}
                    <Text style={{fontSize: 22}}>Account</Text>
                    <View style={styles.account}>
                        <View style={{ width: "45%" }}>
                            <TouchableOpacity onPress={HandleLogout} style={styles.logoutBtn}>
                                <Ionicons name='log-out-outline' size={24} color={"black"} />
                                <Text style={{color: "white", fontFamily: "Roboto-regular"}}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={{ width: "45%" }}>
                            <TouchableOpacity style={styles.changeEmail}>
                                <Ionicons name='return-up-forward-outline' size={24} color='black' />
                                <Text>Change Email</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 10,
        gap: 10
    },
    logoutBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#E3242B",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    changeEmail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#B4F8C8",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
    },
    banner: {
        alignItems: 'center',
        marginBottom: 10,
    },
    photoContainer: {
        padding: 5,
        borderRadius: 20,
        height: "20%",
        width: "100%",
    },
    appearance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    account: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        marginBottom: 35,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: "100%",
        flexDirection: 'row',
        gap: 5,
    },


})