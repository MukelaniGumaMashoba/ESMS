import { router, Stack } from "expo-router";
import { use, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

export default function index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }
  , []);

  return (
    <>
      <Stack
        initialRouteName="(auth)/login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/signup" />
        <Stack.Screen name="(auth)/forgot-password" />
      </Stack>
    </>
  );

}