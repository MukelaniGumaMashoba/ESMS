import { StyleSheet, Image, Platform, Text, View, TextInput } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.textInput}>
        <Ionicons name='search-circle-outline' size={20} />
        <TextInput
          placeholder='search content'
        />
      </View>


      <Text>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  },

});
