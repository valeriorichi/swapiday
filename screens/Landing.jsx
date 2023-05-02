import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

function Landing() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/Swapiday-Big-Logo.png")}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#7bd060",
            padding: 10,
            borderRadius: 5,
            width: 100,
          }}
        >
          <Text
            style={{ color: "black", fontWeight: "bold", textAlign: "center" }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Landing;
