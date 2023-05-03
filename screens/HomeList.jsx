import { Text, View } from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UpdateAvailableDates from "./UpdateListing";

function HomeList() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LogoHeader />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>List of homes!!</Text>
      </View>
    </SafeAreaView>
  );
}

export default HomeList;
