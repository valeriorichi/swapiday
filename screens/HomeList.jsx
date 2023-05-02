import { Text, View } from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import UpdateListHouse from "./UpdateListHouse";

function HomeList() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LogoHeader />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>List of homes!!</Text>
        <UpdateListHouse />
      </View>
    </SafeAreaView>
  );
}

export default HomeList;
