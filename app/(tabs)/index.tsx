import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Courses from '@/components/home/courses';
import HeaderContainer from '@/components/header';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/*  Top view with name and along with image on side */}
      <View>
        <HeaderContainer />
      </View>

      <Text>let's learn something new</Text>

      {/* 4 section of the courses/ subjects owenzayo wena */}
      <View>
        <Courses />
      </View>


      {/* top student section */}
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text>Top Students</Text>
          <Text>Show All</Text>
        </View>

        <View style={styles.topStudentContainer}>
          {/* <Image source={require("../../assets/images/icon.png")} /> */}
          <View>
            <Text>Mukelani Mashoba</Text>
            <Text>Student</Text>
          </View>
          <Ionicons name='arrow-forward' size={10} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textTop: {
    fontSize: 30,
    fontStyle: "normal",
  },
  container: {
    padding: 10,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    backgroundColor: "white",
    flex: 1,
    width: "100%",

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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 1,
    backgroundColor: "lightgrey",
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
  }
});
