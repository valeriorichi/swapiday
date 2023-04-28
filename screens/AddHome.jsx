import { Text, View } from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";

function AddHome() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LogoHeader />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Add a home!</Text>
      </View>
    </SafeAreaView>
  );
}

export default AddHome;
