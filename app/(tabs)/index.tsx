import { Image, StyleSheet, Platform, View, Text, StatusBar, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Courses from '@/components/home/courses';
import HeaderContainer from '@/components/header';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

export default function HomeScreen() {

  const [loaded, error] = useFonts({
    'SpaceMono-Regular': require('../../assets/fonts/SpaceMono-Regular.ttf'),
    'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content" // Sets the text color to light
          backgroundColor="white" // Sets the background color
          translucent={false} // Makes the status bar opaque
        />

        {/*  Top view with name and along with image on side */}
        <View>
          <HeaderContainer />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, gap: 10, marginBottom: 10 }}>
          <View>
            <Text style={{ fontSize: 23, fontFamily: "Roboto-Regular" }}>let's learn</Text>
            <Text style={{ fontSize: 25, fontWeight: "400", fontFamily: "Roboto-Regular" }}>something new today</Text>
          </View>


          {/* 4 section of the courses/ subjects owenzayo wena */}
          <View>
            <Courses />
          </View>


          {/* top student section */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18,fontFamily: "Roboto-Regular"  }}>Top Students</Text>
            <Text style={{fontFamily: "Roboto-Regular" }}>Show All</Text>
          </View>

          <View style={styles.topStudentContainer}>
            <Image source={require("../../assets/images/icon.png")} style={{ height: "70%", width: "15%", borderRadius: 10 }} />
            <View>
              <Text style={{ fontWeight: "bold",fontFamily: "Roboto-Regular"  }}>Mukelani Mashoba</Text>
              <Text style={{ color: "grey",fontFamily: "Roboto-Regular"  }}>Student</Text>
            </View>
            <Ionicons name='arrow-forward' size={10} />
          </View>

          <View style={styles.banner}>
            <ImageBackground source={require("../../assets/pictures/img3.jpg")} style={{ width: '100%', height: 200, borderRadius: 20, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.photoContainer}>
                <Text style={{ color: "white", fontWeight: "300", fontSize: 18,fontFamily: "Roboto-Regular" }}>Let's Learn Together</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{marginTop: -20}}>
            <Text style={{ fontSize: 3, color: "lightgrey" }}>mgm group</Text>
          </View>


        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  textTop: {
    fontSize: 30,
    fontStyle: "normal",
  },
  container: {
    padding: 10,
    // paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: "white",
    flex: 1,
    width: "100%",
    gap: 10,

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: 50,
    borderRadius: 25,
    height: 50,

  },
  topStudentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: "lightgrey",
    borderWidth: 1,
    backgroundColor: "#ededed",
    height: "10%",
  },
  banner: {
    // flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 40,
  },
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
  },
  photoContainer: {
    // backgroundColor: 'lightgrey',
    padding: 5,
    borderRadius: 20,
    height: "20%",
    width: "100%",
  },

});
