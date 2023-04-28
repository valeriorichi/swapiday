import { SafeAreaView, Image } from "react-native";
import React from "react";

export default function LogoHeader() {
  return (
    <SafeAreaView>
      <Image
        source={require("../assets/Header-Logo.png")}
        style={{ width: 180, height: 180, alignSelf: "center", marginTop: -50 }}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
