import { Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import React from "react";
import { useAuth } from "../contexts/AuthContext";

function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/Swapiday-Big-Logo.png")}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
      <View style={{ marginTop: 20 }}>
        <Button
          mode="contained"
          buttonColor="#39C67F"
          onPress={() => navigation.navigate("LoginSignUp")}
        >
          Log in
        </Button>
      </View>
    </View>
  );
}

export default Landing;
