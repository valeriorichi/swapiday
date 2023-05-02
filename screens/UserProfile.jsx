import { Text, View } from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Reviews from "./Reviews";

function UserProfile() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LogoHeader />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>User profile !</Text>
        <Reviews />
      </View>
    </SafeAreaView>
  );
}

export default UserProfile;
