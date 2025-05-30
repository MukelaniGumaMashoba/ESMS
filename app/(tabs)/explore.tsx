import {
  StyleSheet,
  Image,
  Platform,
  View,
  TextInput,
  StatusBar,
  ScrollView,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text } from "@/components/custom";
import React, { useState, useCallback, useRef } from "react";
import YoutubePlayer from "react-native-youtube-iframe";
export default function TabTwoScreen() {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={false}
        />
        <ScrollView showsHorizontalScrollIndicator={false} style={{ margin: 10 }}>
          <View style={styles.textInput}>
            <Ionicons name="search-circle-outline" size={30} color={"lightgray"} />
            <TextInput placeholder="search content" style={{ width: "90%", fontFamily: "Roboto-Regular" }} />
          </View>

          <View>
            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 20, textAlign: "center" }}>Explore</Text>
          </View>


          <View style={{ backgroundColor: "lightgray", marginVertical: 10, borderRadius: 40, overflow: "hidden" }}>
            <View style={styles.videoContainer}>
              <View style={{ width: "100%", padding: 10 }}>
                <Image
                  source={require("../../assets/pictures/img1.png")}
                  style={styles.headerImage} />
                <Text style={styles.textInput}>Welcome Learn Javascript</Text>
              </View>
            </View>
          </View>

          <View style={{ backgroundColor: "lightgray", marginVertical: 10, borderRadius: 40, overflow: "hidden"}}>
            <YoutubePlayer
              height={180}
              play={playing}
              videoId={"MbqSMgMAzxU"}
              onChangeState={onStateChange}
            />
            <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
          </View>


        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    gap: 10,
  },
  headerImage: {
    height: 150,
    width: "100%",
    borderRadius: 40,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
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
  videoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
