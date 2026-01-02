import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useAppAuth } from "@/context/appcontext";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";

export default function Index() {
  // const { user, loading } = useAppAuth();
  // const [isNavigating, setIsNavigating] = useState(false);

  // useEffect(() => {
  //   // Wait for auth to finish loading before navigating
  //   if (!loading && !isNavigating) {
  //     setIsNavigating(true);
  //     // Use setTimeout to ensure layout is mounted
  //     const timer = setTimeout(() => {
  //       if (user) {
  //         console.log("User found, redirecting to tabs");
  //         router.replace("/(tabs)");
  //       } else {
  //         console.log("No user found, redirecting to login");
  //         router.replace("/(auth)/login");
  //       }
  //     }, 100);
      
  //     return () => clearTimeout(timer);
  //   }
  // }, [user, loading, isNavigating]);

  // // Show loading screen while checking auth or navigating
  // if (loading || isNavigating) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#007BFF" />
  //     </View>
  //   );
  // }

  // This should rarely render, but provide a fallback
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#007BFF" />
      <Text>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

