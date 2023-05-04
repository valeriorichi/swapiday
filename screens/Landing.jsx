import { View, Image } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState } from 'react';
import LoginSignUp from './LoginSignUp';

function Landing() {
  const [login, setLogin] = useState(false);

  return !login ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../assets/Swapiday-Big-Logo.png')}
        style={{ width: 300, height: 300 }}
        resizeMode="contain"
      />
      <View style={{ marginTop: 20 }}>
        <Button
          mode="contained"
          buttonColor="#39C67F"
          onPress={() => setLogin(true)}
        >
          Log in
        </Button>
      </View>
    </View>
  ) : (
    <LoginSignUp />
  );
}

export default Landing;
