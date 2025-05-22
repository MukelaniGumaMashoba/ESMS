import { router, Stack } from "expo-router";
import { use, useEffect, useState } from "react";
import { auth } from "@/firebase/FirebaseConfig";

export default function index() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }
  , []);

  // useEffect(() => {
  //   auth().getSession().then(({ data: { session } }) => {
  //     if (session) {
  //       router.replace("/(tabs)/");
  //     } else {
  //       console.log('no user')
  //     }
  //   });

  //   auth().onAuthStateChange((_event, session) => {
  //     if (session) {
  //       router.replace("/(tabs)/");
  //     } else {
  //       console.log('no user')
  //       router.replace("/(auth)/login");
  //     }
  //   });
  // }, []);

  return (
    <Stack>
      <Stack.Screen
        name="(auth)/login"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/signup"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(auth)/forgot-password"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}