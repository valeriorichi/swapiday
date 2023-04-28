import { Text, View } from "react-native";
import React from "react";
import LogoHeader from "./LogoHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from 'react-native-paper';


function LoginSignUp() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LogoHeader />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Login Sign Up !</Text>
      </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login Sign Up !</Text>
      <Button
        icon="camera"
        mode="contained"
        onPress={() => console.log('Pressed')}
      >
        Press me
      </Button>
    </View>
    </SafeAreaView>
  );
}

export default LoginSignUp;
