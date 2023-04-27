import { StyleSheet } from "react-native";
import { firebaseConfig } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Landing from "./screens/Landing";
import HomeList from "./screens/HomeList";
import AddHome from "./screens/AddHome";
import LoginSignUp from "./screens/LoginSignUp";
import UserProfile from "./screens/UserProfile";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const Tab = createBottomTabNavigator();

export default function App() {
  signInWithEmailAndPassword(auth, "quinnlord404@gmail.com", "test123").then(
    (userCredential) => {
      const user = userCredential.user;
      console.log(user.email);
    }
  );

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Landing" component={Landing} />
        <Tab.Screen name="Homes" component={HomeList} />
        <Tab.Screen name="List a home" component={AddHome} />
        <Tab.Screen name="Login/Sign up" component={LoginSignUp} />
        <Tab.Screen name="My Profile" component={UserProfile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
