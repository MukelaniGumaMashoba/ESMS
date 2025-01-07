import { StyleSheet, Image, Platform, Text, View, TextInput, StatusBar } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content" // Sets the text color to light
          backgroundColor="white" // Sets the background color
          translucent={false} // Makes the status bar opaque
        />
        <View >
          <View style={styles.textInput}>
            <Ionicons name='search-circle-outline' size={20} />
            <TextInput
              placeholder='search content'
              style={{ width: '90%' }}
            />
          </View>

          <View>
            <Text style={{fontFamily: "Roboto-Bold"}}>Explore</Text>
          </View>

        </View>
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
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  textInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "#f2f2f2",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#grey",
    padding: 2,

  },

});
