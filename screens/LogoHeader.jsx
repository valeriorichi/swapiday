import { SafeAreaView, Image } from "react-native";
import React from "react";

export default function LogoHeader() {
  return (
    <SafeAreaView>
      <Image
        source={require("../assets/Header-Logo.png")}
        style={{
          width: "90%",
          alignSelf: "center",
          marginTop: -70,
          marginBottom: -85,
        }}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
