import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AUTH_TOKEN_KEY = "auth_token";

export const useAuth = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const signUpMutation = useMutation(api.authHelpers.signUp);
  const signInMutation = useMutation(api.authHelpers.signIn);
  const user = useQuery(
    api.auth.getCurrentUser,
    authToken ? { tokenIdentifier: authToken } : "skip"
  );
  const router = useRouter();

  // Load token on mount
  useState(() => {
    AsyncStorage.getItem(AUTH_TOKEN_KEY).then((token) => {
      if (token) {
        setAuthToken(token);
      }
    });
  });

  const signUp = async (email: string, password: string, name: string) => {
    try {
      await signUpMutation({ email, password, name });
      // Auto sign in after sign up
      return await signIn(email, password);
    } catch (error: any) {
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const result = await signInMutation({ email, password });
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, result.tokenIdentifier);
      setAuthToken(result.tokenIdentifier);
      router.replace("/(tabs)");
      return result;
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    setAuthToken(null);
    router.replace("/(auth)/login");
  };

  return {
    user,
    loading: user === undefined,
    signUp,
    signIn,
    signOut,
    isAuthenticated: !!authToken,
  };
};

