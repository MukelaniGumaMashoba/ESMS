import { initializeApp } from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyBq7DzKywamQ4qlNpi_VVehSWZCbLo2ApU",
  authDomain: "esms-bc30a.firebaseapp.com",
  projectId: "esms-bc30a",
  storageBucket: "esms-bc30a.firebasestorage.app",
  messagingSenderId: "355330654333",
  appId: "1:355330654333:web:a0012f2ed677629f077114",
  measurementId: "G-B18KEGWSQF"
};

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: reactNativePersistence(ReactNativeAsyncStorage)
});
// const analytics = getAnalytics(app);