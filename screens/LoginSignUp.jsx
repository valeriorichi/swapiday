import { Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import React from 'react';

function LoginSignUp() {
  return (
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
  );
}

export default LoginSignUp;
